<template>
  <div style="display:none;"></div>
</template>

<script>
export default {
  name: 'Token',
  emits: ["childLoaded"],
  mounted(){
    console.log("child 1")
    this.isLoggedOn();
    console.log("child 2")
  },
  methods:{
    async isLoggedOn(){
      if(this.$cookies.get("token")!==null || Date.now()>localStorage.getItem("expires_in")){
          await this.fetchNewToken();
      }
      this.$emit("childLoaded")
    },
    async fetchNewToken(){
      let client_id="1ab3b3ac54ba4d7daa64bc7d9d2af3f3";
      let client_sc="7299d6d93ca948ffaf8a254fc52774de";
      let options = {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_sc).toString('base64')),
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