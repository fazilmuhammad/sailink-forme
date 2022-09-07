<template>

  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />

</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    datachart :[],
    modalapp :[],
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 450
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
    
  },
  data() {
    return {
      chartData: {
        labels: this.datachart.label,
        datasets: this.datachart.datasets
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
                        legend: {
                            position: 'top',
                        },
                        // title: {
                        //     display: true,
                        //     text:this.datachart.title+' ( '+this.modalapp.info.startTime+' - '+this.modalapp.info.endTime+' )',
                        // },
                        // tooltip: {
                        //     yAlign: 'top',
                        // }
                    },
        scales:{
          y:{
            title:{
              display:true,
              text:'Traffic('+ this.datachart.unit +')',
            },           
          },
        },

        interaction: {
                        mode: 'index',
                        intersect: false,
                    }
      },

      // options: {
      //               responsive: true,
      //               plugins: {
      //                   legend: {
      //                       position: 'top',
      //                   },
      //                   title: {
      //                       display: true,
      //                       text: con.app.chart.title+' ( '+con.app.info.startTime+' - '+con.app.info.endTime+' )',
      //                   },
      //                   // tooltip: {
      //                   //     yAlign: 'top',
      //                   // }
      //               },
      //               scales: {
      //                   y: {
      //                       title: {
      //                           display: true,
      //                           text: 'Traffic ('+con.app.chart.unit+')',
      //                       },
      //                       // ticks: {
      //                       //     // Include a dollar sign in the ticks
      //                       //     callback: function(value, index, values) {
      //                       //         return (value/1000).toFixed(1)+'K';
      //                       //     },
      //                       // },
      //                   },
      //               },
      //               interaction: {
      //                   mode: 'index',
      //                   intersect: false,
      //               }
      //           }
    
    }
  }
}
</script>

<style>
.traffic{
  transform: rotate(270deg);
}

.wrappchart{
  display: flex;
}
</style>
