<template>
  <div class="login">
    <button @click="authorize" class="loginWithSpotify">
      Login with Spotify
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.isLoggedOn();
  },
  methods: {
    async isLoggedOn() {
      console.log(this.$cookies.get("token") !== null && this.$cookies.get("token") !== "undefined")
      if (this.$cookies.get("token") !== null && this.$cookies.get("token") !== "undefined") {
        this.$router.push({ name: "Home" });
      }
    },
    authorize() {
      let scope =
        "user-top-read user-read-recently-played playlist-read-collaborative playlist-read-private user-follow-read";
      let redirect_uri = "https://spotifystat.netlify.app/redirect";
      let client_id = process.env.VUE_APP_CLIENT_ID;
      
      let state = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("state", state);
      window.location.href =
        "https://accounts.spotify.com/authorize?response_type=code&client_id=" +
        client_id +
        "&scope=" +
        encodeURI(scope) +
        "&redirect_uri=" +
        redirect_uri +
        "&state=" +
        state;
    },
    async fetchNewToken() {
      let client_id = process.env.VUE_APP_CLIENT_ID;
      let client_sc = process.env.VUE_APP_CLIENT_SECRET;
      let options = {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_sc).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.$cookies.get("refresh"),
        }),
      };
      //eslint-disable-next-line
      let get_token = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      )
        .then((response) => {
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.storeNewToken(response);
        })
        .catch((error) => console.error(error.message));
    },
    storeNewToken(token) {
      this.$cookies.set("token", token.access_token);
      localStorage.setItem("expires_in", Date.now() + token.expires_in * 1000);
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, #281430, #4b2455);
  position: relative;
  display: grid;
  place-items: center;
}
.loginWithSpotify {
  font-size: 2vw;
  text-transform: uppercase;
  border: none;
  background: var(--spotify-color);
  color: black;
  padding: 1vw 2vw;
  border-radius: 2em;
  transition: background 0.2s ease-out, border 0.2s ease-out,
    color 0.2s ease-out;
  cursor: pointer;
}
.loginWithSpotify:hover {
  background: none;
  border: 1px solid var(--spotify-color);
  color: white;
}
@media screen and (max-width: 1100px) {
  .loginWithSpotify {
    font-size: 8vw;
  }
}
</style>
