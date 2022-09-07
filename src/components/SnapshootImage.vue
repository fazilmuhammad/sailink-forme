<template>
   <!-- <v-card class="datasnapshot">
    <v-data-table  
    :items="snapshotpict"
    :items-per-page="5"
    class="elevation-1 margintab">
      <template  v-slot:item="row">
           <img class="imgsnapshot" v-bind:src="row.item.src">
      </template>
    </v-data-table>
</v-card> -->
<p></p>
</template>

<script>
import axios from 'axios';
    export default {
        props:['snapshotpict','vessel_id'],
         async created(){
        const response = await axios.get('v1/navplus/snapshot/'+this.vessel_id.id+'/'+this.snapshotpict[0],{
            headers: {
                Authorization: 'Bearer'+ localStorage.getItem('token')
            }
        });
        console.log(response)
    },
    }
</script>

<style lang="scss" scoped>

</style>