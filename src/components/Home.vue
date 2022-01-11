<template>
  <div class="home">
    <Token @childLoaded="childIsReady" />
    <div v-if="loading">
      <div class="loading"></div>
    </div>
    <main v-else>
      <Navbar />
      <div class="right-wrapper">
        <div class="user-info">
          <div class="img-wrapper">
            <img :src="this.user[0].profilePicture" />
          </div>
          <div class="text-wrapper">
            <h1>{{ this.user[1].username }}</h1>
            <div class="user-info-social">
              <p class="followers">
                <span>{{ user[2].followers }}</span> Followers
              </p>
              <p class="following">
                <span>{{ this.user[3].following }}</span> Following
              </p>
              <p class="playlistnumber">
                <span>{{ this.user[4].playlistNumber }}</span> Playlist
              </p>
            </div>
            <button class="logout" @click="logout">Logout</button>
          </div>
        </div>
        <div class="top-wrapper">
          <div class="user-top">
            <div class="title-wrapper">
              <h2>Top Tracks of All Time</h2>
              <button @click="goTo" data-link="TopTrack">See more</button>
            </div>
            <div
              v-for="(n, index) in 10"
              :key="index"
              class="user-track"
              :data-link="
                'https://open.spotify.com/album/' +
                topTracks.items[index].album.id
              "
              @click="openSpotify"
            >
              <img
                class="top-img"
                :src="topTracks.items[index].album.images[2].url"
              />
              <div class="track-info">
                <div class="track-title">
                  <h5>{{ topTracks.items[index].name }}</h5>
                </div>
                <div class="track-album">
                  <h5
                    v-for="artist in topTracks.items[index].artists"
                    :key="artist"
                  >
                    {{ artist.name }}
                  </h5>
                  <h5>-</h5>
                  <h5>{{ topTracks.items[index].album.name }}</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="user-top">
            <div class="title-wrapper">
              <h2>Top Artists of All Time</h2>
              <button @click="goTo" data-link="TopArtist">See more</button>
            </div>
            <div
              v-for="(n, index) in 10"
              :key="index"
              class="user-artist"
              :data-link="
                'https://open.spotify.com/album/' + topArtists.items[index].id
              "
              @click="openSpotify"
            >
              <img
                class="top-img"
                :src="topArtists.items[index].images[2].url"
              />
              <h5>{{ topArtists.items[index].name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Token from "./Token.vue";
import Navbar from "./Navbar.vue";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

export default {
  name: "Home",
  data() {
    return {
      API_URL: "https://api.spotify.com/v1",
      user: null,
      topTracks: null,
      topArtists: null,
      loading: true,
      loaded:0,
    };
  },
  mounted() {},
  components: {
    Token,
    Navbar,
  },
  methods: {
    async childIsReady() {
      if (
        this.$cookies.get("token") === null ||
        this.$cookies.get("token") === "undefined"
      ) {
        this.$router.push({ name: "Login" });
      }
      if (localStorage.getItem("state") !== null) {
        if (localStorage.getItem("state") != null) {
          localStorage.removeItem("state");
        }
        await this.fetchTopItems();
        await this.fetchUserInfo();
      }
      this.updateInfo();
    },
    async fetchUserInfo() {
      let headers = {
         mode:"cors",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`
        },
      };

      let getUserInfo = await fetch(this.API_URL + "/me", headers)
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let getArtistFollow = await fetch(
        this.API_URL + "/me/following?type=artist",
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let getUserPlaylist = await fetch(
        this.API_URL + `/users/${getUserInfo.id}/playlists`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let user = [];
      this.$cookies.set("userId", getUserInfo.id);
      user.push({ profilePicture: getUserInfo.images[0].url });
      user.push({ username: getUserInfo.display_name });
      user.push({ followers: getUserInfo.followers.total });
      user.push({ following: getArtistFollow.artists.total });
      user.push({ playlistNumber: getUserPlaylist.total });
      await AsyncLocalStorage.setItem("user", JSON.stringify(user));
      this.user = user;
      console.log("🚀 ~ file: Home.vue ~ line 192 ~ fetchUserInfo ~ this.user", this.user)
    },
    async fetchTopItems() {
      let headers = {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
          Content: "application/json",
        },
      };

      //Top Artists

      let topArtistsLongTerm = await fetch(
        this.API_URL + `/me/top/artists?limit=50&time_range=long_term`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let topArtistsMediumTerm = await fetch(
        this.API_URL + `/me/top/artists?limit=50`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let topArtistsShortTerm = await fetch(
        this.API_URL + `/me/top/artists?limit=50&time_range=short_term`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      //Top Tracks

      let topTracksLongTerm = await fetch(
        this.API_URL + `/me/top/tracks?limit=50&time_range=long_term`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let topTracksMediumTerm = await fetch(
        this.API_URL + `/me/top/tracks?limit=50`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      let topTracksShortTerm = await fetch(
        this.API_URL + `/me/top/tracks?limit=50&time_range=short_term`,
        headers
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((error) => console.error(error.message));

      //Store Item

      await AsyncLocalStorage.setItem(
        "topTrackAllTime",
        JSON.stringify(topTracksLongTerm)
      );
      await AsyncLocalStorage.setItem(
        "topTrack6Months",
        JSON.stringify(topTracksMediumTerm)
      );
      await AsyncLocalStorage.setItem(
        "topTrack4Weeks",
        JSON.stringify(topTracksShortTerm)
      );
      await AsyncLocalStorage.setItem(
        "topArtistAllTime",
        JSON.stringify(topArtistsLongTerm)
      );
      await AsyncLocalStorage.setItem(
        "topArtist6Months",
        JSON.stringify(topArtistsMediumTerm)
      );
      await AsyncLocalStorage.setItem(
        "topArtist4Weeks",
        JSON.stringify(topArtistsShortTerm)
      );

      this.topTracks=topTracksLongTerm;
      console.log("🚀 ~ file: Home.vue ~ line 324 ~ fetchTopItems ~ this.topTracks", this.topTracks)
      this.topArtists=topTracksLongTerm;
      console.log("🚀 ~ file: Home.vue ~ line 326 ~ fetchTopItems ~ this.topArtists", this.topArtists)
    },
    updateInfo() {
      this.user = JSON.parse(localStorage.getItem("user")) || this.user;
      this.topTracks = JSON.parse(localStorage.getItem("topTrackAllTime")) || this.topTracks;
      this.topArtists = JSON.parse(localStorage.getItem("topArtistAllTime")) || this.topArtists;
      this.loading = false;
    },
    goTo(e) {
      this.$router.push({ name: e.target.getAttribute("data-link") });
    },
    openSpotify(e) {
      window.open(e.target.getAttribute("data-link"), "_blank");
    },
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("refresh");
      localStorage.removeItem("user");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("topTrackAllTime");
      localStorage.removeItem("topTrack6Months");
      localStorage.removeItem("topTrack4Weeks");
      localStorage.removeItem("topArtistAllTime");
      localStorage.removeItem("topArtist6Months");
      localStorage.removeItem("topArtist4Weeks");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.home,.loading {
  width: 100vw;
  background: linear-gradient(to top, #281430, #4b2455);
  color: white;
}
.loading{
  height:100vh;
}

.right-wrapper {
  margin-left: 7vw;
}
.user-info {
  padding-top: 2vw;
  display: flex;
  justify-content: center;
  position: relative;
  user-select: none;
}
.img-wrapper {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 2vw;
  display: grid;
  place-content: center;
}
.img-wrapper > img {
  width: auto;
  height: inherit;
}
.text-wrapper {
  width: auto;
  height: auto;
  position: relative;
}
.text-wrapper > h1 {
  margin: 0;
  font-size: 3vw;
}
.user-info-social {
  color: #c7c7c7;
  display: flex;
}
.user-info-social > p {
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 1vw;
  margin: 0 0.5vw;
}
.user-info-social > p:first-of-type,
.user-info-social > p > span:first-of-type {
  margin-left: 0;
}
.user-info-social > p > span {
  color: var(--spotify-color);
  margin: 0 0.5vw;
  font-weight: bold;
}
.logout {
  display: block;
  margin: auto;
  padding: 1vw 1.2vw;
  border: 1px solid var(--spotify-color);
  background: none;
  color: var(--spotify-color);
  border-radius: 2em;
  font-size: 0.9vw;
  text-transform: uppercase;
  margin-top: 1vw;
  transition: background 0.3s ease-out, color 0.3s ease-out;
  cursor: pointer;
}
.logout:hover {
  background: var(--spotify-color);
  color: black;
}
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-wrapper h2 {
  font-size: 1.8vw;
}
.title-wrapper > button {
  padding: 0.7vw 1.2vw;
  border: 1px solid var(--spotify-color);
  background: none;
  color: var(--spotify-color);
  border-radius: 3em;
  font-size: 0.9vw;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease-out, color 0.3s ease-out;
}
.title-wrapper > button:hover {
  background: var(--spotify-color);
  color: black;
}
.top-wrapper {
  margin-top: 7vw;
  display: flex;
  justify-content: space-evenly;
}
.user-top {
  width: 34vw;
  height: 53vw;
}
.user-track,
.user-artist {
  display: flex;
  margin-top: 1.5vw;
  cursor: pointer;
  transition: background 0.3s ease-out;
}
.user-track *,
.user-artist * {
  pointer-events: none;
}
.user-track:hover,
.user-artist:hover {
  background: #4a1f54;
}
.user-artist {
  align-items: center;
}
.top-img {
  width: 3vw;
  height: 3vw;
}
.track-info {
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.track-info h5,
.user-artist h5 {
  margin: 0;
}
.track-title h5 {
  font-size: 1vw;
  color: var(--spotify-color);
}
.track-album {
  display: flex;
}
.track-album h5 {
  font-size: 0.9vw;
  color: #c7c7c7;
  font-weight: lighter;
}
.track-album h5:not(:first-of-type) {
  margin-left: 0.5vw;
}
.user-artist h5 {
  margin-left: 1vw;
  font-weight: lighter;
  font-size: 1vw;
}

@media screen and (max-width: 1100px) {
  .right-wrapper {
    margin-left: 13vw;
  }
  .top-wrapper {
    flex-direction: column;
  }
  .user-top {
    width: 85vw;
    height: unset;
    margin-bottom: 2vw;
  }
  .top-img {
    width: 7vw;
    height: 7vw;
  }
  .img-wrapper {
    width: 14vw;
    height: 14vw;
  }
  .track-title h5 {
    font-size: 4vw;
  }
  .title-wrapper h2 {
    font-size: 5vw;
  }
  .user-artist,
  .user-track {
    margin-top: 2.5vw;
  }
  .user-artist h5 {
    font-size: 3vw;
  }
  .track-album h5,
  .user-info-social > p,
  .title-wrapper > button,
  .logout {
    font-size: 2vw;
  }
  .text-wrapper > h1 {
    font-size: 5vw;
  }
}
</style>
