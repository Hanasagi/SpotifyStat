<template>
  <router-view :key="$route.fullPath"/>
</template>

<style>
  @import 'fonts.css';
  :root{
    --spotify-color: #1ED760;
  }
  body{
    margin: 0;
  }
#app {
  font-family: "Circular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 1em;
    background: #4a0b4a;
}
::-webkit-scrollbar-thumb {
  background: #e571e5;
  border-radius: 2em;
}
::selection{
  color: #b152c9;
}
html.touch *:hover {
    all:unset!important;
}

</style>
