<script>
import { CIRCLE_CENTER_CONFIG } from "@/constants/mapSettings";

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
    center: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    const { Circle } = this.google.maps;
    const {InfoWindow} =this.google.maps;
    var map=this.map
    var Circlex = new Circle({
      center: {
        lat: parseFloat(this.center.lat),
        lng: parseFloat(this.center.lng),
      },
      map: this.map,
      ...CIRCLE_CENTER_CONFIG,
    });


    var InfoWindowx = new InfoWindow({
      content: contentString,
    })

    var contentString = "<h3>Hello Dunia!</h3>";

    // var infowindow = new this.google.maps.InfoWindow({
    //   content: contentString,
    // });

    Circlex.addListener("click", () => {
      console.log("ok");
      InfoWindowx.open({
        anchor: Circlex,
        map,
        shouldFocus: true,
      });
    });
  },
};
</script>
