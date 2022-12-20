<template>

    <header>
      <!-- <h3>Profile</h3> -->
      <h4>Basic Information</h4>
    </header>    
    
    <form @submit="onSubmit" class="add-form">
    
        <div class="form-group-1">
            <label for="name">Name</label>
            <input type="text"
                id="name"
                class="form-control"
                v-model="userData.name">
        </div>
        <div class="form-group-1">
            <label for="language">Preferred Language</label>
            <input type="text"
                id="language"
                class="form-control"
                v-model.lazy="userData.language">
        </div>
        <div class="form-group-1">
            <label for="sex">Sex</label>
            <input type="checkbox" id="female" value="Female" v-model="userData.sex">
            <label for="female">Female</label>
            <input type="checkbox" id="male" value="Male" v-model="userData.sex">
            <label for="male">Male</label>
        </div>
        <div class="form-group-1">
            <label for="dob">Date of Birth</label>
            <Datepicker v-model="userData.dob" format="MM/dd/yyyy" class="datepicker"></Datepicker>
        </div>
        <div class="form-group-1">
            <label for="address">Address</label>
            <input type="text"
                id="address"
                class="form-control"
                v-model.lazy="userData.address">
        </div>
        <div class="form-group-1">
            <label for="race">Race</label>
            <select v-model="userData.race">
                <option disabled value="">Please select one</option>
                <option>Asian</option>
                <option>Pacific Islander</option>
                <option>Black</option>
                <option>African American</option>
                <option>Hispanic</option>
                <option>Latino</option>
                <option>Native American</option>
                <option>Alaskan Native</option>
                <option>White</option>
                <option>Caucasian</option>
                <option>Biracial</option>
                <option>Multiracial</option>
            </select>
        </div>
        <div class="form-group-1">
            <label for="insurance">Insurance Policy</label>
            <input type="text"
                id="insurance"
                class="form-control"
                v-model.lazy="userData.insurance">
        </div>
        <div class="form-group-1">
            <label for="pharmacy">Pharmacy</label>
            <input type="text"
                id="pharmacy"
                class="form-control"
                v-model.lazy="userData.pharmacy">
        </div>
        <div class="form-group-1">
            <label for="contact">Contact Number</label>
            <input type="text"
                id="contact"
                class="form-control"
                v-model.lazy="userData.contact">
        </div>
        <div class="form-group-1">
            <label for="employment">Employment Status</label>
            <select v-model="userData.employment">
                <option disabled value="">Please select one</option>
                <option>Employed</option>
                <option>Unemployed</option>
                <option>Retired</option>
            </select>
        </div>
        <div class="form-group-1">
            <label for="marital">Marital Status</label>
            <select v-model="userData.marital">
                <option disabled value="">Please select one</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Separated</option>
                <option>Widowed</option>
            </select>
        </div>
        <input type="submit" value="Update" class="btn btn-block" />
    </form>

</template>


<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Amplify, API } from 'aws-amplify';
import Auth from '@aws-amplify/auth'

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "updateProfile",
                endpoint: "https://4xucebyhtj.execute-api.us-east-1.amazonaws.com/test-stage-1"
            }
        ]
    }
});

export default {
        components: { Datepicker },
        mounted() {
            Auth.currentUserInfo()
                .then(res => {
                    this.userData.id = res.username;
                    console.log(this.userData.id);
                })
                .catch(err => {
                console.error(err);
                })
        },
        data() {
            return {
                section: 'basic_info',
                userData: {
                    id: '',
                    name: '',
                    language: '',
                    sex: [],
                    dob: null,
                    address: '',
                    race: [],
                    insurance: '',
                    pharmacy: '',
                    contact: '',
                    employment: [],
                    marital: [],


                }
            }
        },
        methods : {
            onSubmit(e){
                e.preventDefault()
                // if(!this.name){
                //     alert('Please Add a Name')
                //     return
                // }
                const apiName = 'updateProfile'
                const path = '/patient/' + this.userData.id + '/updateProfile'
                const NewInformation = {
                    body: {
                        section: this.section,
                        patientID: this.userData.id,
                        name : this.userData.name,
                        language : this.userData.language,
                        sex : this.userData.sex,
                        dob : this.userData.dob,
                        address: this.userData.address,
                        race: this.userData.race,
                        insurance : this.userData.insurance,
                        pharmacy : this.userData.pharmacy,
                        contact : this.userData.contact,
                        employment : this.userData.employment,
                        marital : this.userData.marital
                    }
                }
                console.log(NewInformation);

                API.put(apiName, path, NewInformation)
                    .then((response) => {
                        // Add your code here
                        console.log(NewInformation);
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });

                this.$emit('add-information', newInformation);
                this.userData.name = '',
                this.userData.language = '',
                this.userData.sex = [],
                this.userData.dob = null,
                this.userData.address = '',
                this.userData.race = [],
                this.userData.insurance = '',
                this.userData.pharmacy = '',
                this.userData.contact = '',
                this.userData.employment = [],
                this.userData.marital = []

            }
        }
    }

</script>

<style>


</style>