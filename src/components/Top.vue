<template>
  <div ref="top" class="top">
    <div v-if="loading">
      <div class="loading"></div>
    </div>
    <main v-else>
      <Navbar/>
      <div class="header"><button @click="changeTime" class="changeTime active" data-time="allTime">All time</button><button @click="changeTime" class="changeTime" data-time="6Months">Last 6 months</button><button @click="changeTime" class="changeTime" data-time="4Weeks">Last 4 weeks</button></div>
      <div v-if="path==='/toptracks'">
        <div class="grid" v-if="currentTime==='allTime'">
          <div v-for="(item,index) in allTimeTop['items']" :key="item" class="user-track" >
               <div :data-link="'https://open.spotify.com/album/'+item.album.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify"><img class="top-img" :src="item.album.images[1].url">
            <div class="track-info">
              <div class="track-title">
                <h5>{{index+1}}. {{item.name}}</h5>
              </div>
              <div class="track-album">
                <h5 v-for="artist in item.artists" :key="artist">{{artist.name}} </h5>
                <h5>-</h5>
                <h5>{{item.album.name}}</h5>
              </div>
            </div></div>
          </div>
        </div>
        <div class="grid" v-if="currentTime==='6Months'">
          <div v-for="(item,index) in sixMonthsTop['items']" :key="item" class="user-track" >
            <div :data-link="'https://open.spotify.com/album/'+item.album.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify"><img class="top-img" :src="item.album.images[1].url">
            <div class="track-info">
              <div class="track-title">
                <h5>{{index+1}}. {{item.name}}</h5>
              </div>
              <div class="track-album">
                <h5 v-for="artist in item.artists" :key="artist">{{artist.name}} </h5>
                <h5>-</h5>
                <h5>{{item.album.name}}</h5>
              </div>
            </div></div>
            
          </div>
        </div>
        <div class="grid" v-if="currentTime==='4Weeks'">
          <div v-for="(item,index) in fourWeeksTop['items']" :key="item" class="user-track" >
             <div :data-link="'https://open.spotify.com/album/'+item.album.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify"><img class="top-img" :src="item.album.images[1].url">
            <div class="track-info">
              <div class="track-title">
                <h5>{{index+1}}. {{item.name}}</h5>
              </div>
              <div class="track-album">
                <h5 v-for="artist in item.artists" :key="artist">{{artist.name}} </h5>
                <h5>-</h5>
                <h5>{{item.album.name}}</h5>
              </div>
            </div></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid-artist" v-if="currentTime==='allTime'">
          <div v-for="(item,index) in allTimeTop['items']" :key="index" class="user-artist" >
          <div :data-link="'https://open.spotify.com/artist/'+item.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify">
              <div>
              <img class="top-img" :src="item.images[1].url">
            </div>
            <div>
              <h5>{{index+1}}. {{item.name}}</h5>
            </div>
            </div>
          </div>
        </div>
        <div class="grid-artist" v-if="currentTime==='6Months'">
          <div v-for="(item,index) in sixMonthsTop['items']" :key="index" class="user-artist" >
           <div :data-link="'https://open.spotify.com/artist/'+item.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify">
              <div>
              <img class="top-img" :src="item.images[1].url">
            </div>
            <div>
              <h5>{{index+1}}. {{item.name}}</h5>
            </div>
            </div>
          </div>
        </div>
        <div class="grid-artist" v-if="currentTime==='4Weeks'">
          <div v-for="(item,index) in fourWeeksTop['items']" :key="index" class="user-artist">
            <div :data-link="'https://open.spotify.com/artist/'+item.id" @click="openSpotify" tabindex="0"  @keydown.enter="openSpotify">
              <div>
              <img class="top-img" :src="item.images[1].url">
            </div>
            <div>
              <h5>{{index+1}}. {{item.name}}</h5>
            </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>


<script>
  import Navbar from './Navbar.vue';
export default {
  name: 'Top',
  data() {
    return {
      allTimeTop: null,
      sixMonthsTop: null,
      fourWeeksTop: null,
      loading: true,
      currentTime: "allTime",
      path: null
    }
  },
  components:{
    Navbar
  },
  mounted() {
    this.path = this.$route.fullPath;
    if (this.path === "/toptracks") {
      this.allTimeTop = this.setItem("topTrackAllTime");
      this.sixMonthsTop = this.setItem("topTrack6Months");
      this.fourWeeksTop = this.setItem("topTrack4Weeks");
    } else if (this.path === "/topartists") {
      this.allTimeTop = this.setItem("topArtistAllTime");
      this.sixMonthsTop = this.setItem("topArtist6Months");
      this.fourWeeksTop = this.setItem("topArtist4Weeks");
    }
    console.log(this.fourWeeksTop)
    this.loading = false;
  },
  methods: {
    setItem(item) {
      return JSON.parse(localStorage.getItem(item))
    },
    changeTime(e) {
      let currentActive=document.querySelector(".active");
      currentActive.classList.remove('active');
      e.target.classList.add("active");
      this.currentTime = e.target.getAttribute("data-time");
    },
    openSpotify(e){
      window.open(e.target.getAttribute("data-link"),'_blank');
    }
  }
}

</script>

<style scoped>
   .top {
   width: 100vw;
   background: linear-gradient(to top, #281430, #4b2455);
   color: white;
 }

 .header {
   display: flex;
   justify-content: center;
       margin-left: 7vw;
 }

 .changeTime {
   background: none;
   border: none;
   color: white;
   font-size: 1.5vw;
   font-weight: lighter;
   font-family: "Circular";
   margin: 1vw;
   position: relative;
   padding: 0;
   cursor: pointer;
   transition: color 0.3s ease-out;
 }
 .active{
  color: var(--spotify-color);
  pointer-events: none;
 }
 .changeTime:hover{
  color: var(--spotify-color);
 }
 .changeTime:after{
  width: 0%;
 }
 .changeTime:after,.active:after{
   content: '';
   position: absolute;
   left: 0;
   bottom: 0;
   height: 0.10vw;
   background: var(--spotify-color);
   transition: width 0.3s ease-out;
 }
 .changeTime:hover:after{
  width: 100%;
 }
 
 .grid,
 .grid-artist {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 2vw 0;
   margin-left: 7vw;
 }

 .grid-artist {
   gap: 3vw 0;
 }

 .user-track,
 .user-artist {
   width: 28vw;
  display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
 }
 .user-artist:focus{
   outline:1px solid var(--spotify-color);
 }
  .user-artist div:focus h5{
  color: var(--spotify-color);
 }

  .user-track>div:focus>.track-info>.track-title{
  color: #b152c9;
 }
 .user-track>div{
    width: auto;
    height: auto;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
 }
 .user-track>div:hover>.track-info>.track-title{
  color: #b152c9;
 }

 .user-track >div *,
 .user-artist >div *{
    pointer-events: none;
 }

 .user-artist div:hover h5{
  color: var(--spotify-color);
 }

 .user-artist>h5 {
   position: absolute;
   bottom: -3.5vw;
   margin: 0;
 }

 .user-artist>div{
  width: auto;
  height: auto;
  cursor: pointer;
 }

 .user-artist>div>div:first-of-type {
   width: 17vw;
   height: 17vw;
   overflow: hidden;
 }

 .user-artist>div>div:last-of-type {
   position: relative;
   height: 2vw;
   width: 17vw;
 }

 .user-artist h5 {
   position: absolute;
   bottom: 0;
   margin: 0;
   left: 0;
   right: 0;
   text-align: center;
   font-size: 1vw;
   transition: color 0.3s ease-out;
 }

 .user-track h5 {
   margin: 0;
 }

 .top-img {
   width: 17vw;
   height: auto;
 }

 .track-info {
   display: flex;
   flex-direction: column;
   align-items: center;
 }

 .track-title {
   font-size: 1.5vw;
   color: var(--spotify-color);
   transition: color 0.3s ease-out;
 }

 .track-album {
   display: flex;
   font-size: 0.8vw;

   color: #c7c7c7;
 }

 .track-album h5 {
   font-weight: lighter;
 }

 .track-album h5:not(:first-of-type) {
   margin-left: 0.4vw;
 }

 @media screen and (max-width: 1100px){
  .header{
    margin-bottom: 3vw;
  }
  .changeTime{
    font-size: 3.5vw;
    margin-top:4vw;
  }
  .top main{
    margin-left: 2vw;
  }
  .grid, .grid-artist{
    grid-template-columns: repeat(2, 1fr);
    margin-left: 11vw;
  }
  .user-artist,.user-track{
    width: 44vw;
  }
  .track-title h5{
    font-size: 3vw;
  }
  .track-album{
    font-size: 1.5vw;
  }
  .top-img{
    width: 28vw;
  }
  .user-artist>div>div:first-of-type{
    width: 28vw;
    height: 28vw;
  }
  .user-artist>div>div:last-of-type{
    width: 28vw;
    height: 3vw;
  }
  .user-artist h5{
    font-size: 2vw;
  }

 }
</style>
