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
    //create an empty list for coordinates
    coordinates_list = [];
    latitude_list = [];
    longitude_list = [];
    depth_list = [];
    for (let i = 0; i < features.length; i++){
        let feature = features[i].geometry.coordinates;
        let properties = features[i].properties.detail;
        coordinates_list.push(feature.slice(0,2));
        depth_list.push(parseInt(feature.slice(2,3)).toFixed(0));
        let fillColor;

        if(depth_list[i]>= -10 && depth_list[i] < 10){
            fillColor = "green";
        } else if (depth_list[i]>= 10 && depth_list[i] < 30){
            fillColor = "red";
        } else if (depth_list[i]>= 30 && depth_list[i] < 50){
            fillColor = "blue";
        } else if (depth_list[i]>= 50 && depth_list[i] < 70){
            fillColor = "orange";
        } else if (depth_list[i]>= 70 && depth_list[i] < 90){
            fillColor = "yellow";
        } else if (depth_list[i] > 90){
            fillColor = "white";
        }


        
        let marker = L.circle(coordinates_list[i].reverse(),{
            radius: depth_list[i]*1100,
            color: fillColor,
            fillColor: fillColor
            
            

        }).addTo(myMap);
        // Binding a popup to our marker to check coordinates

    marker.bindPopup("Hello");
    };
    console.log(coordinates_list)
    console.log(depth_list)
    //console.log(properties)
    
})