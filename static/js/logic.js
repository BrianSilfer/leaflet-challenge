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
    depth_list = [];
    for (let i = 0; i < features.length; i++){
        let feature = features[i].geometry.coordinates;
        coordinates_list.push(feature.slice(0,2))
        depth_list =[];
        let marker = L.marker(coordinates_list[i],{
            draggable: true

        }).addTo(myMap);
        // Binding a popup to our marker to check coordinates

    marker.bindPopup("Hello");
    };
    console.log(coordinates_list)
    
    
})