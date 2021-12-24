<template>
  <div ref="top" class="top">
  </div>
</template>

<script>
export default {
  name: 'Playlist',
  data(){
    return{
      playlist:null,
      loading:true,
    }
  },
  mounted(){
     this.playlist=JSON.parse(localStorage.getItem("playlist"));
     this.loading=false;
  },
  methods:{
  }
}
</script>

<style scoped>
  .login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to top, #281430, #4b2455);
    position: relative;
    display: grid;
    place-items: center
  }

</style>
