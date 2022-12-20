<template>
        <div id="nav">
            <router-link to="/login">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/profile/basicinfo" v-if="role == 'patient'">Profile |</router-link>
            <router-link to="/makeAppointment" v-if="role == 'patient'"> Make Appointment |</router-link>
            <router-link to="/myAppointments" v-if="role == 'patient'"> My Appointments |</router-link>
            <router-link to="/getAppointments" v-if="role == 'doctor'"> Get Appointment |</router-link>
            <router-link to="/getPatientTable" v-if="role == 'doctor'"> Get Patient Table |</router-link>
            
        </div>
        <router-view />
</template>

<script>
import Auth from '@aws-amplify/auth'
export default {
    name: "userID",
    mounted() {
        this.userID = "none"
        this.role = "none" 
        Auth.currentUserInfo()
        .then(res => {
            if (res) {
                this.userID = res.username;
                this.role = res.attributes["custom:role"];
                console.log(this.role, this.userID);
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
    data() {
        return {
            userID: 0,
            role: ""
        }
    }
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
    display: block;
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