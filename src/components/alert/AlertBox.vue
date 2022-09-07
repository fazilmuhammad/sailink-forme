<template>
  
    <v-alert :color="color" outlined dense prominent text :icon="icon">
      {{ message }}
    </v-alert>
 
</template>

<script>
export default {
  name: "ErrorComp",
  props: ["message", "color", "icon"],
};
</script>

<style lang="scss" scoped>

</style>
