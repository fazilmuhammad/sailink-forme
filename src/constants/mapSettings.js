import colorPalette from "@/constants/colorPalette";


const {
  COLOR_LANDSCAPE,
  COLOR_BORDERS,
  COLOR_WATER,
  COLOR_LINE,
  COLOR_POINT_FILL,
  COLOR_SELECTED_POINT
} = colorPalette;

const COLORS = {
  BORDERS: COLOR_BORDERS,
  LANDSCAPE: COLOR_LANDSCAPE,
  LINE: COLOR_LINE,
  POINT: COLOR_SELECTED_POINT,
  POINT_FILL: COLOR_POINT_FILL,
  WATER: COLOR_WATER
};

const POINT_MARKER_ICON_CONFIG = {
  path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
  strokeOpacity: 0.7,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.7,
  scale: 1
};

// const LINE_SYMBOL_CONFIG = {
//   path: "M 0,-2 0,2",
//   strokeOpacity: 1,
//   strokeWeight: 2,
//   scale: 1
// };

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: '#FFE900',
};

const CIRCLE_CENTER_CONFIG = {
  strokeColor: '#09BF00',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#09BF00',
  fillOpacity: 0.35,
  radius: 1500,
  // content: dot_content,
  optimized: true,
  zIndex: 100,
};

const mapSettings = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: "cooperative",
  backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: false,
  zoomControlOptions: {
    style: "SMALL"
  },
  zoom: 5,
  minZoom: 2,
  styles: [
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
          {
              "color": "#BAA2BB"
          },
          {
              "lightness": 0
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
          {
              "color": "#C0DCAE"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "water",
      elementType: "geometry",
      stylers: [
          {
              "color": "#9AC5D5"
          },
          {
              "lightness": 0
          }
      ]
  }
  ]
};


const mapSettingsShow = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: "cooperative",
  backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: false,
  zoomControlOptions: {
    style: "SMALL"
  },
  zoom: 6,
  minZoom: 2,
  styles: [
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
          {
              "color": "#BAA2BB"
          },
          {
              "lightness": 0
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
          {
              "color": "#C0DCAE"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
          {
              "color": "#BDA8BB"
          },
          {
              "lightness": 0
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
          {
              "color": "#F1EFE9"
          },
          {
              "lightness": 0
          }
      ]
  },
  {
      featureType: "water",
      elementType: "geometry",
      stylers: [
          {
              "color": "#9AC5D5"
          },
          {
              "lightness": 0
          }
      ]
  }
  ]
};

export { mapSettings,mapSettingsShow, LINE_PATH_CONFIG,CIRCLE_CENTER_CONFIG, POINT_MARKER_ICON_CONFIG };
