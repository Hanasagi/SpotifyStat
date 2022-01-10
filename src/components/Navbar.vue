<template>
<nav class="left-nav">
          <div class="left-wrapper">
            <div @click="goTo" data-link="Home">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg><h5>PROFILE</h5></div>
            <div @click="goTo" data-link="TopTrack">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.682c-.002 1.555-1.17 2.318-2.24 2.318-.903 0-1.76-.544-1.76-1.616 0-1.104 1.201-2.118 2.515-2.118.161 0 .323.015.485.047v-4.312l-6 1.229v5.45c-.002 1.556-1.18 2.32-2.258 2.32-.906 0-1.742-.542-1.742-1.61 0-1.106 1.201-2.125 2.518-2.125.16 0 .322.015.484.047v-6.52l7.998-1.792v8.682zm-13-6.682c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-1c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm-1.818 2.646c-1.293-.508-2.319-1.534-2.827-2.827l-1.025.128c.6 1.746 1.979 3.125 3.725 3.724l.127-1.025zm-4.869-2.572l-1 .125c.757 2.648 2.84 4.731 5.488 5.488l.125-1c-2.194-.683-3.93-2.418-4.613-4.613zm8.505-6.72c1.293.508 2.319 1.534 2.827 2.828l1.025-.128c-.6-1.746-1.979-3.125-3.725-3.725l-.127 1.025zm-1.771 15.644c.082-.734.378-1.441.878-2.045-.304.03-.613.047-.925.047-4.963 0-9-4.038-9-9s4.037-9 9-9c4.912 0 8.91 3.957 8.992 8.849l1.978-.443c-.311-5.798-5.096-10.406-10.97-10.406-6.075 0-11 4.925-11 11s4.925 11 11 11l.047-.002zm2.151-18.685l-.125 1c2.195.682 3.931 2.418 4.613 4.613l1-.125c-.755-2.648-2.838-4.732-5.488-5.488z"/></svg>
              <h5>TOP TRACKS</h5>
            </div>
            <div @click="goTo" data-link="TopArtist">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 23v-11c-4.036 0-6 2.715-6 5.5 0 2.807 1.995 5.5 6 5.5zm18-5.5c0-2.785-1.964-5.5-6-5.5v11c4.005 0 6-2.693 6-5.5zm-12-13.522c-3.879-.008-6.861 2.349-7.743 6.195-.751.145-1.479.385-2.161.716.629-5.501 4.319-9.889 9.904-9.889 5.589 0 9.29 4.389 9.916 9.896-.684-.334-1.415-.575-2.169-.721-.881-3.85-3.867-6.205-7.747-6.197z"/></svg>
            <h5>TOP ARTISTS</h5></div>
          </div>
        </nav>
</template>

<script>
export default {
  name: 'Navbar',
  mounted(){
  },
  methods:{
     goTo(e){
      this.$router.push({name:e.target.getAttribute("data-link")})
    }
  }
}
</script>

<style scoped>
  .left-nav{
    position: sticky;
    top: 0;
    height: 100vh;
    float: left;
    z-index: 99;
  }
  .left-wrapper{
    position: fixed;
    background: #0c0010;
    width: 7vw;
    height: 100vh;    
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .left-wrapper>div{
    cursor: pointer;
    margin: 2vw auto;
    display: grid;
    place-content: center;
  }
  .left-wrapper>div *{
    pointer-events: none;
  }
  .left-wrapper>div:hover > svg{
    fill: var(--spotify-color);
  }
  .left-wrapper>div:hover > h5{
    color: var(--spotify-color);
  }
  .left-wrapper > div > svg{
    fill: white;
    width: 2vw;
    height: auto;
    margin: 0 auto;
    transition: fill 0.3s ease-out;
  }
  .left-wrapper>div >h5{
    margin: 0;
    font-size: 0.8vw;
    transition: color 0.3s ease-out;
  }

  @media screen and (max-width: 1100px){
    .left-wrapper{
      width: 12vw;
    }
    .left-wrapper>div{
      margin: 7vw auto;
    }
    .left-wrapper > div > svg{
      width: 4vw;
    }
    .left-wrapper>div >h5{
      font-size:2.8vw;
    }
  }

</style>
