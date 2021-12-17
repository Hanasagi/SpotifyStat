<template>
  <div class="login">
    <button @click="authorize" class="loginWithSpotify">Login with Spotify</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods:{
    authorize(){
      let scope="user-top-read user-read-recently-played playlist-read-collaborative playlist-read-private";
      let redirect_uri="http://localhost:8080/redirect";
      let client_id="1ab3b3ac54ba4d7daa64bc7d9d2af3f3";
      let state=Math.random().toString(36).substring(2, 15);
      localStorage.setItem("state",state)
      window.location.href="https://accounts.spotify.com/authorize?response_type=code&client_id="+client_id+"&scope="+encodeURI(scope)+"&redirect_uri="+redirect_uri+"&state="+state
    }
  }
}
</script>

<style scoped>
  .login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to top, #141e30, #243b55);
    position: relative;
    display: grid;
    place-items: center
  }
  .loginWithSpotify{
    font-size: 2vw;
    text-transform: uppercase;
    border: none;
    background: #1ED760;
    color: white;
    font-family: "Circular";
    padding: 1vw 2vw;
    border-radius: 2em;
  }

</style>
