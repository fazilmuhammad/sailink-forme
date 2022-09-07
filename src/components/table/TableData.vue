<template>
    <div v-if="!mysailink">
    <TableSkeleton/>
   </div>
   <v-data-table v-if="mysailink" :headers="headers" :items="tablerow" :items-per-page="10" class="elevation-1">
      <template v-slot:item="row">
          <tr>
            <td>{{row.item.id}}</td>
            <td>{{row.item.name}}</td>
            <td>{{row.item.pt_name}}</td>
            <td><div class="grouptxt" v-if="!row.item.pt_group"> - </div><div v-if="row.item.pt_group">{{row.item.pt_group}}</div></td>
            <td>{{row.item.serial_number}}</td>
             <td>
            
            <div class="dropdown">
              <button class="btnmrtg btn btn-primary dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><i class='bx bxs-ruler' ></i>&nbsp;&nbsp;MRTG
              </button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                <li v-if="row.item.mrtg_id" role="presentation"><a role="menuitem" tabindex="-1" href="#">Metered</a></li>
                <li v-if="row.item.mrtg_id_2" role="presentation"><a role="menuitem" tabindex="-1" href="#">Unmetered</a></li>
              </ul>
            </div>
   
            </td>
             <td>
            <button class="btnping" role="button" @click="onButtonClick(row.item)"><i class='bx bxs-megaphone' ></i>&nbsp;&nbsp;PING</button>      
            </td>
             <td>
            <button class="btnmrtg" role="button" @click="onButtonClick(row.item)"><i class='bx bxs-wrench'></i>&nbsp;&nbsp;Notification</button>      
            </td>
            <td>
            <button class="btnshowmap" role="button" @click="onButtonClick(row.item)"><i class='bx bxs-map'></i>&nbsp;&nbsp;Show On Map</button>      
            </td>
          </tr>
      </template>
    </v-data-table>
</template>

<script>
import TableSkeleton from '@/components/skeleton/TableSkeleton.vue'
    export default {
    name:'TableData',
    props:['tablerow','headers'],
    components:{
      TableSkeleton
    },
      
    }
</script>

<style lang="scss" scoped>
th{
  background-color: #b8cce2;
  color: #fff;
}

th .text{
  color: #fff;
}

td{
  text-align: left;
}

.grouptxt{
  width: 80px;
}

.container{
    margin-top: 90px;
}

/* CSS */
.btnshowmap {
  align-items: center;
  appearance: none;
  background-color: #868686;
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 11px;
}

.btnshowmap:focus {
  box-shadow: #0B4281 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.btnshowmap:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #868686 0 -3px 0 inset;
  transform: translateY(-2px);
}

.btnshowmap:active {
  box-shadow: #868686 0 3px 7px inset;
  transform: translateY(2px);
}



.btnmrtg {
  align-items: center;
  appearance: none;
  background-color: #3E87CD;
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 11px;
}

.btnmrtg:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.btnmrtg:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.btnmrtg:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}


.btnping {
  align-items: center;
  appearance: none;
  background-color: #868686;
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 11px;
}

.btnping:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.btnping:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #af6715 0 -3px 0 inset;
  transform: translateY(-2px);
}

.btnping:active {
  box-shadow: #868686 0 3px 7px inset;
  transform: translateY(2px);
}
</style>