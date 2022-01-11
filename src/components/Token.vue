<template>
  <div style="display:none;"></div>
</template>

<script>
export default {
  name: 'Token',
  emits: ["childLoaded"],
  mounted(){
    this.checkToken();
  },
  methods:{
    async checkToken(){
      if((this.$cookies.get("token") !== null && this.$cookies.get("token") !== "undefined")|| Date.now()>localStorage.getItem("expires_in") && (localStorage.getItem("expires_in")!==null || localStorage.getItem("expires_in")!==undefined)){
          await this.fetchNewToken();
      }
      this.$emit("childLoaded")
    },
    async fetchNewToken(){
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
            "grant_type": 'refresh_token',
            "refresh_token": this.$cookies.get("refresh"),
          })
        }
        //eslint-disable-next-line
        let get_token = await fetch('https://accounts.spotify.com/api/token',options).then((response) => {
          return response;
        }).then(response => {
          return response.json();
        }).then(response => {
          this.storeNewToken(response);
        }).catch((error) => console.error(error.message));
    },
    async storeNewToken(token){
      await this.$cookies.set("token",token.access_token);
      localStorage.setItem("expires_in",Date.now()+3600*1000);
      localStorage.setItem("state","token_refreshed");
    }
  }
}
</script>