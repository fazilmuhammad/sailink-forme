<script>
// import { LINE_PATH_CONFIG } from "@/constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    }
  },

  methods:{
    animateCircle(line) {
        let count = 0;
        var id_animate = window.setInterval(() => {
        // window.setInterval(() => {
            count = (count + 1) % 200;
            // console.log("COUNT == "+count);
            const icons = line.get("icons");
            icons[1].offset = count / 2 + "%";
            line.set("icons", icons);
            if (count == 199) {
                const icons = line.get("icons");
                icons[1].icon = null;
                line.set("icons", icons);
                clearInterval(id_animate);
            }
        }, 100);
    }
  },

  mounted() {
     const dottedLine = {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          scale: 2,
          // strokeWeight: 2,
      };

      const lineSymbol = {
          path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          // path: google.maps.SymbolPath.ARROW,
          strokeColor: '#0000FF',
          strokeOpacity: 1,
          scale: 3,
          fillColor: '#0000FF',
          fillOpacity: 1,
          optimized: true,
      };

    const { Polyline } = this.google.maps;
    const line = new Polyline({
      path: this.path,
      map: this.map,
       strokeColor: '#FFE900',
      icons: [
        {
          icon: dottedLine,
          offset: "0",
          // repeat: "20px",
        },
        {
          icon: lineSymbol,
          offset: "100%",
          // repeat: "50px",
        },
      ],
    });

    this.animateCircle(line);
  },

};
</script>
