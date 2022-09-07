<template>

<div class="loadmap">
  <v-data-table
    item-key="name"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
  ></v-data-table>
</div>
</template>

<script>
    export default {
        name : 'TableSkeleton',
    
    }
    
</script>

<style lang="scss" scoped>
.loadmap{
  top: 20px;
}
$base-color: #F4F4F4;
$shine-color: rgba(229,229,229,0.8);
$animation-duration: 2.0s;
$avatar-offset: 52 + 16;


@mixin background-gradient {
  background-image: linear-gradient(90deg, $base-color 0px, $shine-color 40px, $base-color 80px);
  background-size: 600px;
}

.div{
  display: flex;
}

.tg{
   border-collapse:collapse;
   border-spacing:0;
   border-color:#ccc;
   width: 100%;
}
.tg td{
  font-family:Arial, sans-serif;
  font-size:190px;
  padding:10px 5px;
  border-style:solid;
  border-width:0px;
  overflow:hidden;
  word-break:normal;
  border-color:#ccc;
  color:#333;
  background-color:#fff;
}

.line{
    float: left;
    width: 400px;
    height: 500px;
    margin-top: 12px;
    border-radius: 7px;
    
    @include background-gradient;
    animation: shine-lines $animation-duration infinite ease-out;
}

 
@keyframes shine-lines{
    0% { background-position: -400px;}
    40%, 100% {background-position: 140px;}
}

</style>