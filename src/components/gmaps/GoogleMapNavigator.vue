<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { mapActions, mapGetters } from "vuex";
import $ from "jquery";
export default {
  props: {
    mapConfig: Object,
  },

  data() {
    return {
      google: null,
      map: null,
      circle: null,
      upimg: require("@/assets/img/up.png"),
      downimg: require("@/assets/img/down.png"),
      offimg: require("@/assets/img/off-hire.png"),
      suspendimg: require("@/assets/img/suspend.png"),
      thurupimg: require("@/assets/img/thurup.png"),
      thurinactiveimg: require("@/assets/img/thurinactive.png"),
    };
  },

  async mounted() {
    this.$root.$on("centerMap", (lat, lon) => {
      this.centerPeta(lat, lon);
    });

    this.$root.$on("centerMarker", (lat, lon) => {
      this.centerMarker(lat, lon);
    });

    this.$root.$on("centerMarkerDel", () => {
      this.centerMarkerDel();
    });

    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();

    const addLegends = document.createElement("div");
    this.addLegend(addLegends, this.map);
    this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(
      addLegends
    );

    const centerMapControlDiv = document.createElement("div");
    this.addCenterMapControl(centerMapControlDiv, this.map);
    this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(
      centerMapControlDiv
    );

    const mapControlDiv = document.createElement("div");
    this.addmapControl(mapControlDiv, this.map);
    this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(
      mapControlDiv
    );

    const centerControlDiv = document.createElement("div");
    this.addCenterControl(centerControlDiv, this.map);
    this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(
      centerControlDiv
    );

   

    const bmkgLayerControls = document.createElement("div");
    this.bmkgLayerControl(bmkgLayerControls, this.map);
    this.map.controls[this.google.maps.ControlPosition.BOTTOM_LEFT].push(
      bmkgLayerControls
    );

    const bmkgDateControls = document.createElement("div");
    this.bmkgDateControl(bmkgDateControls, this.map);
    this.map.controls[this.google.maps.ControlPosition.BOTTOM_CENTER].push(
      bmkgDateControls
    );


 
  },

  methods: {
    ...mapActions([
      "trylah",
    ]),
    centerMarker(lat, lon) {
      console.log(lat);
      console.log(lon);
      var latLng = new this.google.maps.LatLng(lat, lon);
      this.map.panTo(latLng);

      const { Marker } = this.google.maps;
      if (this.circle) this.circle.setMap(null);
      this.circle = new Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lon) },
        title: "Hello World!",
        map: this.map,
        icon: {
          path: "M72.5,36.4C70.8,21.2,58.8,9.2,43.6,7.5V0h-7.3v7.5C21.2,9.2,9.2,21.2,7.5,36.4H0v7.3h7.5c1.7,15.2,13.7,27.2,28.9,28.9V80 h7.3v-7.5c15.2-1.7,27.2-13.7,28.9-28.9H80v-7.3H72.5z M40,65.5c-14.1,0-25.5-11.4-25.5-25.5S25.9,14.5,40,14.5S65.5,25.9,65.5,40 S54.1,65.5,40,65.5z M40,18.7c-11.7,0-21.3,9.5-21.3,21.3S28.3,61.3,40,61.3S61.3,51.7,61.3,40S51.7,18.7,40,18.7z M40,59.6 c-10.8,0-19.6-8.8-19.6-19.6c0-10.8,8.8-19.6,19.6-19.6c10.8,0,19.6,8.8,19.6,19.6C59.6,50.8,50.8,59.6,40,59.6z",
          fillColor: "#00BCD4",
          fillOpacity: 3,
          strokeWeight: 2,
          strokeColor: "#0B4281",
          anchor: new this.google.maps.Point(40, 40),
        },
      });
    },

    centerMarkerDel() {
      if (this.circle) this.circle.setMap(null);
    },

    centerPeta(lat, lon) {
     
      console.log(lat);
      console.log(lon);
      var latLng = new this.google.maps.LatLng(lat, lon);
      this.map.setZoom(80);
      this.map.panTo(latLng);

      const { Marker } = this.google.maps;
      if (this.circle) this.circle.setMap(null);
      this.circle = new Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lon) },
        title: "Hello World!",
        map: this.map,
        icon: {
          path: "M72.5,36.4C70.8,21.2,58.8,9.2,43.6,7.5V0h-7.3v7.5C21.2,9.2,9.2,21.2,7.5,36.4H0v7.3h7.5c1.7,15.2,13.7,27.2,28.9,28.9V80 h7.3v-7.5c15.2-1.7,27.2-13.7,28.9-28.9H80v-7.3H72.5z M40,65.5c-14.1,0-25.5-11.4-25.5-25.5S25.9,14.5,40,14.5S65.5,25.9,65.5,40 S54.1,65.5,40,65.5z M40,18.7c-11.7,0-21.3,9.5-21.3,21.3S28.3,61.3,40,61.3S61.3,51.7,61.3,40S51.7,18.7,40,18.7z M40,59.6 c-10.8,0-19.6-8.8-19.6-19.6c0-10.8,8.8-19.6,19.6-19.6c10.8,0,19.6,8.8,19.6,19.6C59.6,50.8,50.8,59.6,40,59.6z",
          fillColor: "#00BCD4",
          fillOpacity: 3,
          strokeWeight: 2,
          strokeColor: "#0B4281",
          anchor: new this.google.maps.Point(40, 40),
        },
      });
    },

 

    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
      var map_index=this.map;
      
      map_index.data.loadGeoJson(
    "https://peta-maritim.bmkg.go.id/public_api/static/wilayah_perairan.json"
  );


  $.getJSON('https://peta-maritim.bmkg.go.id/public_api/overview/gelombang.json', function(data) {
            // JSON result in `data` variable
            var wave_data = data;
            // console.log(wave_data);

            map_index.data.setStyle(function(feature) {
                var WP_1 = feature.getProperty('WP_1');
                var color = "gray";

                // console.log("A.01 today == "+wave_data['A.01'].today);
                var wave = '';

                wave = wave_data[WP_1].today;
                // console.log(wave);

                if (wave == "Tenang") {
                    color = "#718BEB";
                }
                if (wave == "Rendah") {
                    color = "#79D057";
                }
                if (wave == "Sedang") {
                    color = "#6A808C";
                }
                if (wave == "Tinggi") {
                    color = "#E37833";
                }
                if (wave == "Sangat Tinggi") {
                    color = "#B1303B";
                }
                if (wave == "Ekstrem") {
                    color = "#CF3BC9";
                }
                if (wave == "Sangat Ekstrem") {
                    color = "#000000";
                }

                feature.setProperty('color', color);

                return {
                    fillOpacity: 50/100,
                    fillColor: color,
                    strokeWeight: 1,
                    strokeOpacity: 0,
                }
            });
        });




        const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";


    const infowindow = new this.google.maps.InfoWindow({
    content: contentString,
    
  });











        map_index.data.addListener('click', function() {
          console.log('gas')
          infowindow.open({
      map:this.map,
      shouldFocus: false,
    });
  
        })

    },








    bmkgLayerControl(controlDiv) {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.borderRadius = "3px";
        controlUI.style.marginTop = "8px";
        controlUI.style.padding = "8px";
        controlUI.style.marginBottom = "8px";
        controlUI.style.marginLeft = "-65px";
        controlUI.style.textAlign = "center";
        controlUI.style.boxShadow= "0 4px 8px 0 rgba(0, 0, 0, 0.2)";

            controlDiv.id = "bmkgLayer-container";
            controlDiv.className = "opac-0";
            controlDiv.appendChild(controlUI);
            controlDiv.style.display = "none";
            // Set CSS for the control interior.
            const legend = document.createElement("div");
            // legend.style.color = "rgb(25,25,25)";
            // legend.style.fontSize = "16px";
            // legend.style.lineHeight = "3px";
            legend.innerHTML = '';
            legend.innerHTML += '<h6 class"text-center">Wave Category</h6>';
            legend.innerHTML += '<hr class="mb-1 mt-1">';
            legend.innerHTML += '<div class="d-flex px-1 waveBox flex-column mt-2">';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #718BEB">&#9724;</span>&nbsp;&nbsp;Calm/Smooth 0 - 0.5 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #79D057">&#9724;</span>&nbsp;&nbsp;Slight 0.5 - 1.25 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #6A808C">&#9724;</span>&nbsp;&nbsp;Moderate 1.25 - 2.5 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #E37833">&#9724;</span>&nbsp;&nbsp;Rough 2.5 - 4 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #B1303B">&#9724;</span>&nbsp;&nbsp;Very Rough 4 - 6 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #CF3BC9">&#9724;</span>&nbsp;&nbsp;High 6 - 9 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<div class="d-flex flex-row">';
            legend.innerHTML += '<p class="text-left mb-0" style="font-size:12.6px;"><span style="color: #000000">&#9724;</span>&nbsp;&nbsp;Very High 9 - 14 m</p>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<hr class="mb-1 mt-1" >';
            legend.innerHTML += '<div class="form-group row" style="margin-bottom:15px">';
            legend.innerHTML += '<p id="opacityLabel"  class="text-center" for="opacityControl" style="font-size:12.6px;">Opacity (<span id="opacityPercentage">50</span>%)</p>';
            legend.innerHTML += '<input type="range" class="form-control-range" style="margin-top:-15px" id="opacityControl">';
            legend.innerHTML += '</div>';
            legend.innerHTML += '<br>Source by <a target="_blank" href="https://www.bmkg.go.id/">BMKG</a>';
            controlUI.appendChild(legend);

        // controlDiv.style.display = "none";
        // controlDiv.style.opacity = 0;
    },

    bmkgDateControl(controlDiv) {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.borderRadius = "3px";
        controlUI.style.padding = "8px";
        controlUI.style.marginBottom = "8px";
        controlUI.style.textAlign = "center";
        controlUI.style.boxShadow= "0 4px 8px 0 rgba(0, 0, 0, 0.2)";

        controlDiv.id = "bmkgDate-container";
        controlDiv.className = "opac-0";
        controlDiv.appendChild(controlUI);
        controlDiv.style.display = "none";

        // Set CSS for the control interior.
        const dateControl = document.createElement("div");
        dateControl.innerHTML = '';
        dateControl.innerHTML += '<h6 class"text-center">BMKG</h6>';
        dateControl.innerHTML += '<hr class="mb-1 mt-1">';
        dateControl.innerHTML += '<div class="buttons_bmkgdate">';
        dateControl.innerHTML += '<button value="0" class="bmkgDate-btn"><i class="bx bx-time"></i>&nbsp;&nbsp;Today</button>';
        dateControl.innerHTML += '<button value="1" class="bmkgDate-btn"><i class="bx bx-calendar-alt"></i>&nbsp;&nbsp;Tomorrow</button>';

        const today = new Date();
        const d2 = new Date(today);
        const d3 = new Date(today);
        d2.setDate(d2.getDate() + 2);
        d3.setDate(d3.getDate() + 3);
        dateControl.innerHTML += '<button value="2" class="bmkgDate-btn"><i class="bx bx-calendar-alt"></i>&nbsp;&nbsp;' + d2.toDateString() + '</button>';
        dateControl.innerHTML += '<button value="3" class="bmkgDate-btn"><i class="bx bx-calendar-alt"></i>&nbsp;&nbsp;' + d3.toDateString() + '</button>';
        dateControl.innerHTML += '</div>';
        controlUI.appendChild(dateControl);
    },




    addCenterControl(controlDiv) {
      
      const controlUI = document.createElement("div");

      controlUI.innerHTML = `
     <label class="dropdown">
     <div  class="dd-button">SatNet</div>
     <input type="checkbox" class="dd-input">

    <ul class="dd-menu">
      <li class="uper_li"><input type="checkbox" onchange="eirpOn(this)" id="checkbox">&nbsp;EIRP</li>
      <li class="uper_li"><input type="checkbox" onchange="gntOn(this)">&nbsp;G/T+</li>
      <li class="divider"></li>
      <li class="bot_li" ><input type="checkbox" onchange="Skyreach1On(this)"/>&nbsp;Skyreach 1</li>
      <li class="bot_li" ><input type="checkbox" onchange="Skyreach2On(this)"/>&nbsp;Skyreach 2</li>
      <li class="bot_li" ><input type="checkbox" onchange="Apstar9On(this)"/>&nbsp;Apstar 9</li>
      <li class="bot_li" ><input type="checkbox" onchange="Abs2On(this)"/>&nbsp;ABS 2A</li>
      <li class="bot_li" ><input type="checkbox" onchange="OcnOn(this)"/>&nbsp;SR1 Maritime</li>
    </ul>
  
    </label>
      `;

      controlDiv.appendChild(controlUI);
      // controlUI.addEventListener('click', () => {
      //   // Do what ever you want to happen on click event
      //   map.setCenter({
      //     lat: 53.57532,
      //     lng: 10.01534,
      //   });
      // });
    },

    addmapControl(controlDiv) {
      const controlUI = document.createElement("div");

      controlUI.innerHTML = `
     <label class="dropdown">

  <div class="dd-button">
    MAP
  </div>

  <input type="checkbox" class="dd-input" id="test">

  <ul class="dd-menu">
     <li class="bot_li" ><input  type="checkbox"  onchange="BMKGOn(this)">&nbsp;BMKG</li>
     <li class="bot_li" ><input type="checkbox" onchange="labelOn(this)"/>&nbsp;Fleet Label</li>
     <li class="bot_li" ><input  type="checkbox">&nbsp;Fleet Allert</li>
     <li class="bot_li" ><input  type="checkbox">&nbsp;Vessel Down Info</li>
  </ul>
  
</label>
      `;

      controlDiv.appendChild(controlUI);
      // controlUI.addEventListener('click', () => {
      //   // Do what ever you want to happen on click event
      //   map.setCenter({
      //     lat: 53.57532,
      //     lng: 10.01534,
      //   });
      // });
    },

    addCenterMapControl(controlDiv) {
      const controlUI = document.createElement("div");

      controlUI.innerHTML = `
  
      <label class="centerOut">

<div class="centerOut-button">
  <i class='bx bx-map-alt' ></i>
</div>

</label>
    `;

      controlDiv.appendChild(controlUI);
      controlUI.addEventListener('click', () => {
        // Do what ever you want to happen on click event
        this.map.setCenter({
          lat: 1.724404925138275, 
          lng: 116.20014587484876
        });

        this.map.setZoom(5);
      });
    },

    addLegend(controlDiv) {
      const controlUI = document.createElement("div");

      controlUI.innerHTML = `
  

    <div class="card">
    <p class="title_legend">Legend</p>
    <hr class="hr_legend"/>
    <ul class="list_legend">
    <li class="listlist_legend"><img src="`+this.upimg+`"  class="vs_image">&nbsp;SAILINK UP</li>
    <li class="listlist_legend"><img src="`+this.downimg+`" class="vs_image">&nbsp;SAILINK DOWN</li>
    <li class="listlist_legend"><img src="`+this.offimg+`" class="vs_image">&nbsp;SAILINK Off-Hire</li>
    <li class="listlist_legend"><img src="`+this.suspendimg+`" class="vs_image">&nbsp;SAILINK Suspended</li>
    <li class="listlist_legend"><img src="`+this.thurupimg+`" class="vs_image">&nbsp;Thuraya UP</li>
    <li class="listlist_legend"><img src="`+this.thurinactiveimg+`" class="vs_image">&nbsp;Thuraya Inactive</li>
    </ul>

</div>
    `;

      controlDiv.appendChild(controlUI);
      // controlUI.addEventListener('click', () => {
      //   // Do what ever you want to happen on click event
      //   this.map.setCenter({
      //     lat: 1.724404925138275, 
      //     lng: 116.20014587484876
      //   });
      // });
    },





















    

  },
  computed: {
    ...mapGetters(["apiKey"]),
  },
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 86vh;
  top: 14vh;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  background-color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.dd-button:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
}

.dd-button:hover {
  background-color: #eeeeee;
}

.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 100%;
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  list-style-type: none;
}

.dd-input + .dd-menu {
  display: none;
}

.dd-input:checked + .dd-menu {
  display: block;
}

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider {
  padding: 0;
  border-bottom: 1px solid #cccccc;
}

@media (max-width: 280px) {
  .google-map {
    top: 5rem;
    height: calc(100vh - 5rem);
  }
}

@media (min-width: 280px) and (max-width: 319px) {
  .google-map {
    top: 5rem;
    height: calc(100vh - 5rem);
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .google-map {
    top: 5rem;
    height: calc(100vh - 5rem);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .google-map {
    top: 5rem;
    height: calc(100vh - 5rem);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .google-map {
    top: 5rem;
    height: calc(100vh - 5rem);
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .google-map {
    top: 6rem;
    height: calc(100vh - 6rem);
  }
}

/* Extra large screens / TV */
@media screen and (min-width: 1201px) {
  .google-map {
    top: 5.6rem;
    height: calc(100vh - 5.6rem);
  }
}

</style>
