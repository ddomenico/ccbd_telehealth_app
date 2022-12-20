<template>
    <div class="profile">

    <div class="subnav-area">

        <div id="subnav">
            <router-link to="/profile/basicinfo">Basic Info</router-link> |
            <router-link to="/profile/allergy">Allergies</router-link> |
            <router-link to="/profile/familyhistory">Family History</router-link> |
            <router-link to="/profile/immunization">Immunizations</router-link> |
            <router-link to="/profile/medication">Medication</router-link> |
            <router-link to="/profile">Vitals</router-link>      
    </div>
    <div id="subnav">
            <router-link to="/profile/chatbot">Profile Chatbot</router-link> | 
            <router-link to="/profile">Image Upload</router-link> |
            <router-link to="/profile">Sensor Measurement</router-link> 
            
    </div>
    
    </div>

    <router-view />



    </div>
</template>





<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
        components: { Datepicker },
        data() {
            return {
                userData: {
                    name: '',
                    language: '',
                    checkedSex: [],
                    dob: null,

                }
            }
        },
        methods : {
            onSubmit(e){
                e.preventDefault()
                if(!this.name){
                    alert('Please Add a Name')
                    return
                }
                const NewInformation = {
                    id: Math.floor(Math.random() * 100000),
                    name : this.name,
                    age : this.age,
                    reminder : this.reminder
                }
                this.$emit('add-information', newInformation)
                this.name = ' ',
                this.age = ' '
            }
        }
    }

</script>


<style>

@import url("https://fonts.googleapis.com/css?family=PT+Sans:400,700");
/* html {
  font-size: 10px;
  tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
} */


#app {
    display: block;
}

*, *:before, *:after {
  margin: 5px;
  padding: 0;
  box-sizing: inherit;
}

body {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  line-height: 1.428571429;
  font-weight: 400;
  color: #fff;
}


main,
footer {
  display: block;
  position: relative;
  z-index: 1;
}

header {
  /* padding: 48px; */
    display: block;
    padding-top: 10%;

}


@media (max-width: 440px) {
  header {
    /* padding: 48px 24px; */
  }
}
header > h3 {
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 8px;
	text-align: center;
}
header > h4 {
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 1px;
	text-align: center;
}

main {
  flex: 1;
  padding: 0 48px;
}
@media (max-width: 440px) {
  main {
    padding: 0 24px;
  }
}

/* form {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
} */

#subnav {
    color: #2c3e50;
    
    /* position: fixed; */
}

#subnav a {
    /* font-weight: bold; */
    color: #2c3e50;
}

#subnav a.router-link-exact-active {
    color: #d6d8d7;
}

.subnav-area {
    position: fixed;
    width: 100%;
    background-color: #7BACAE;
    top: 8%;
    left: 0;
    padding: 10px;
    z-index: 1;
}




.form-group-1 {
    
    text-align: left;
    padding-left: 30%;
    padding-top: 2%;

}

.form-control {
  color: #E2E3E8;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #2c3e50;
  appearance: none;
  outline: none;
}

.datepicker {
    display: inline-block;
    /* background-color: transparent;
    border: none;
    appearance: none;
    outline: none;             */
}

.btn {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 1px;
  padding: 8px 48px 8px 48px;
  margin-top: 32px;
  margin-bottom: 32px;
  border: 2px solid #2c3e50;
  border-radius: 20px;
  cursor: pointer;
  transition: all ease .2s;
}

.btn:hover {
  background-color: #2c3e50;
  border: 2px solid #2c3e50;
  color: #E2E3E8;
}


</style>