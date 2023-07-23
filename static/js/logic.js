// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
    center : [40,-100],
    zoom: 4
});

//Adding background tile layer to the map:
//Using addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//import earthquake data from URL
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
    //check that data loaded
    console.log(data)
    //define features to loop through data
    let features = data.features
    //create an empty list for coordinates and depths
    coordinates_list = [];
    latitude_list = [];
    longitude_list = [];
    depth_list = [];
    //write a for loop to loop through every feature and pull coordinates, depth to create markers
    for (let i = 0; i < features.length; i++){
        let feature = features[i].geometry.coordinates;
        coordinates_list.push(feature.slice(0,2));
        depth_list.push(parseInt(feature.slice(2,3)).toFixed(0));
        //define fillColor
        let fillColor;
        //write if else statements to match the color to the magnitude category based on mag size
        if(depth_list[i]>= -10 && depth_list[i] < 10){
            fillColor = "#54F253";
        } else if (depth_list[i]>= 10 && depth_list[i] < 30){
            fillColor = "#CAD246";
        } else if (depth_list[i]>= 30 && depth_list[i] < 50){
            fillColor = "#F3B46A";
        } else if (depth_list[i]>= 50 && depth_list[i] < 70){
            fillColor = "#ffb653";
        } else if (depth_list[i]>= 70 && depth_list[i] < 90){
            fillColor = "#ff7538";
        } else if (depth_list[i] > 90){
            fillColor = "#ee204d";
        }


        //create circle markers based on data pulled from each earthquake
        let marker = L.circle(coordinates_list[i].reverse(),{
            radius: depth_list[i]*1100,
            color: fillColor,
            
            fillOpacity: 1
            
            
            

        }).addTo(myMap);

        // Binding a popup to our marker using a f-statment like feature of js
        let marker_message = `Magnitude: ${features[i].properties.mag} <br> 
        Location: ${features[i].properties.place} <br>
        Depth: ${depth_list[i]}`
        marker.bindPopup(marker_message);
        
        
    };
    
    //initial console logs to check to see if data was being collected correctly
    console.log(coordinates_list)
    console.log(depth_list)
   
    
})