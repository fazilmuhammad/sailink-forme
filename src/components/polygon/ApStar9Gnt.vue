<script>
  export default {
    props: {
      google: {
        type: Object,
        required: true,
      },
      map: {
        type: Object,
        required: true,
      },
      paths: {
        type: Array,
        required: true,
      },
    },
  
    data() {
      return {
        polyGon: null,
      };
    },
  
    mounted() {
      const { Polygon } = this.google.maps;
      this.polyGon = new Polygon({
        paths: this.paths,
        fillColor: "#60B482",
        strokeColor: "#008000",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillOpacity: 0.05,
      });
      // this.polyGon.setMap( this.map );
      this.google.maps.event.addListener(this.polyGon, "mouseover", function () {
        this.setOptions({ fillOpacity: 0.5 });
      });
  
      this.google.maps.event.addListener(this.polyGon, "mouseout", function () {
        this.setOptions({ fillOpacity: 0 });
      });
  
      this.$root.$on("removeApstar9Gnt", () => {
        this.removeApstar9Gnt();
      });
  
      this.$root.$on("addApstar9Gnt", () => {
        this.addApstar9Gnt();
      });
    },
  
    methods: {
      removeApstar9Gnt() {
        this.polyGon.setMap(null);
        console.log("unchecked");
      },
  
      addApstar9Gnt() {
        this.polyGon.setMap(this.map);
        console.log("checked");
      },
    },
  };
  </script>
  