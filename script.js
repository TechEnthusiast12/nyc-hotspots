
	mapboxgl.accessToken = "pk.eyJ1IjoibGF3ZW5mb3JjZXIxMiIsImEiOiJjbDV1MGV1M3owZW45M2pveTkzZnh5OTNyIn0.6j_KIdGzeH2_BKGfD9N7qg";

  
  
// Creating the Map Instance
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-73.8915, 40.72088], // starting position
      zoom: 13 // starting zoom
  });


  // Initializing the Geolocation Object
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    showUserHeading: true,
    trackUserLocation: true
    });

    // Add the control to the map.
    map.addControl(geolocate);
    map.on('load', () => {
    geolocate.trigger();
    });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());


  // Adding the Directions plugin to the map
  map.addControl(
      new MapboxDirections({
      accessToken: mapboxgl.accessToken
      }),
      'top-left'
      );

const getMarkers = async ()=>{
    try {
      let {data} = await axios.get('https://data.cityofnewyork.us/resource/yjub-udmw.json');

    return data;
    } catch (error) {
      console.error(error.message);
    }
   
  }

  map.on('load', async ()=>{


    let data = await getMarkers();

    // Create Markers and Popups
    data.forEach(element => {
      
      let div = document.createElement('div');
      
      
      let head = document.createElement('h1');
      
      head.innerHTML = element.name;
      
      div.appendChild(head);
      
      let head2 = document.createElement('h2');
      head2.innerHTML = element.provider;
      div.appendChild(head2);
      
      

      let popup = new mapboxgl.Popup({offset: 25}).setDOMContent(div);


      
      let marker = new mapboxgl.Marker().setLngLat([element.longitude, element.latitude]).setPopup(popup).addTo(map);


  });
  });



  

