


<template>
<div :class="{active:active}">
<div class="WrapperInfoWindow">
<div class="InfoWindow">
  
  <v-card
    class="mx-auto"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5" >
         <p class="txt">{{datainfo.name}}</p>
        </v-list-item-title>
       
         <v-list-item-title class="text-h2">
          <p class="txt_small">{{datainfo.pt}}</p>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  



   <v-simple-table dense >
    <template v-slot:default>
      <tbody>
        <tr>
          <td>Lat,Lon</td><td>:</td><td>{{datainfo.lat}}</td>
        </tr>
        <tr>
          <td>DMS</td><td>:</td><td>{{datainfo.dms}}</td>
        </tr>
        <tr>
          <td>Speed</td><td>:</td><td>{{datainfo.speed}}</td>
        </tr>
        <tr><td>Heading</td><td>:</td><td>{{datainfo.heading}}</td></tr>
        <tr><td>SatNet</td><td>:</td><td>{{datainfo.satnet}}</td></tr>
        <tr><td>EIRP</td><td>:</td><td>50.00 dBW</td></tr>
        <tr><td>G/T+</td><td>:</td><td>-6 dB/K</td></tr>
        <tr><td>Weather</td><td>:</td><td>Cloudy</td></tr>
        <tr><td>Wind</td><td>:</td><td>1.5m/s</td></tr>
        <tr><td>Waves</td><td>:</td><td>0.12m</td></tr>
      </tbody>
    </template>
  </v-simple-table>
      


    <v-card-actions>
      <v-btn block small>
        More Detail
      </v-btn>
    </v-card-actions>
  </v-card>

</div>
</div>
</div>
</template>

<style>


.WrapperInfoWindow .InfoWindow{
	background: #fff;
	position: absolute;
	bottom: 9px;
	left: 0;
  width: 24%;
	transition: all 0.5s ease;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);  
  border-radius: 10px 10px 10px 10px;
  text-align: left;
}

.WrapperInfoWindow .InfoWindow{
	left: -552px;
}

.active .WrapperInfoWindow .InfoWindow{
	left: 10px;
}
.v-list-item{
  background-color: #0B4281;
  color: #FFF

}

.txt{
  color: #fff;
  margin-bottom: -2px;
}

.txt_small{
  color: #fff;
  font-size: 12px;
}
</style>

<script>
  export default {
    props:['active','datainfo'],
    data () {
      return {
        labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        time: 0,
        forecast: [
          { day: 'Latlon', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
          { day: 'DMS', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
          { day: 'Speed', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
      }
    },
  }
</script>