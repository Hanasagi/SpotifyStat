<template>
  <div></div>
</template>

<script>
export default {
  name: 'Login',
  mounted(){
		this.checkSearchParams();
  },
  methods:{
		checkSearchParams(){
			let params = (new URL(window.location)).searchParams;
			let code = params.get("code") || null;
			let paramState= params.get("state") || null;
			let localState= localStorage.getItem("state");
			if(localState !== paramState || paramState===null) this.$router.push("/");
			this.fetchToken(code);
		},
		async fetchToken(code){
    let client_id = process.env.VUE_APP_CLIENT_ID;
      let client_sc = process.env.VUE_APP_CLIENT_SECRET;
			let options = {
          method: 'POST',
          mode:"cors",
          headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_sc).toString('base64')),
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            "grant_type": 'authorization_code',
            "code": code,
            "redirect_uri": "https://spotifystat.netlify.app/redirect",
          })
        }
        //eslint-disable-next-line
        let get_token = await fetch('https://accounts.spotify.com/api/token',options).then((response) => {
          return response;
        }).then(response => {
          return response.json();
        }).then(response => {
          this.storeInCookies(response);
        }).catch((error) => console.error(error.message));
		},
		storeInCookies(token){
			this.$cookies.set("token",token.access_token);
			this.$cookies.set("refresh",token.refresh_token);
			localStorage.setItem("expires_in",Date.now()+(token.expires_in*1000));
			this.$router.push({name:"Home"})
		}

	}
}
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, #141e30, #243b55);
}
</style>
