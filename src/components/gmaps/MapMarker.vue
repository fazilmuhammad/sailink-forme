

<script>


export default {
 data(){
return{
        // active:null,
        // datainfo:null,
}
 },
  props: {
    info:{},
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },

  methods:{
    showinfo: function(m,i){
     this.$root.$emit('showInfoComp', m,i) //like this
    },
  },



  mounted() {
    const { Marker } = this.google.maps;
    
    var markerx = new Marker({
      position:{lat :parseFloat(this.marker.lat) , lng : parseFloat(this.marker.lon)},
      marker: this.marker,
      map: this.map,
    //   label:{
    //   className:'markerLabel',
    //   text: this.marker.name,
    //   color: "#0006BC",
    //   fontSize: "10px",
          
    // },
      icon:{
          path:'M5.81.19,0,14.54a.31.31,0,0,0,.5.33,8.14,8.14,0,0,1,5.57-2.3,8.15,8.15,0,0,1,5.58,2.3.3.3,0,0,0,.49-.33L6.38.19A.31.31,0,0,0,5.81.19Z',
          fillColor: this.marker.fill,
          fillOpacity: 1,
          strokeWeight: 0.5,
          rotation:parseFloat(this.marker.heading),
          anchor: new this.google.maps.Point(7.5, 7.5),
          labelOrigin: new this.google.maps.Point(7.5, 7.5)
    },
      
    });



    markerx.addListener("click",()=>{
      this.showinfo(this.marker,this.info)
    })

 
   },
   

};
</script>
