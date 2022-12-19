<template>
  <div id="app">
        <div id="nav">
            <router-link to="/login">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/profile/basicinfo">Profile</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
    color: #2c3e50;
    background-color:cadetblue;
}
#nav {
    padding: 30px;
    position: fixed;
    top: 0;
    left: 0;
    background-color:cadetblue;
    width: 100%;
    text-align: left;
    z-index: 1;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
}
#nav a.router-link-exact-active {
    color: #d6d8d7;
}
</style>
