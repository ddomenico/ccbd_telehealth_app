<template>
    <div class="allergy">
    

    <header>
      <!-- <h3>Profile</h3> -->
      <h4>Allergies</h4>
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
            <label for="onset_date">Onset Date</label>
            <Datepicker v-model="userData.onset_date" format="MM/dd/yyyy" class="datepicker"></Datepicker>
        </div>
        <div class="form-group-1">
            <label for="reactions">Reactions</label>
            <input type="text"
                id="reactions"
                class="form-control"
                v-model.lazy="userData.reactions">
        </div>
        <div class="form-group-1">
            <label for="status">Status</label>
            <input type="checkbox" id="active" value="Active" v-model="userData.status">
            <label for="active">Active</label>
            <input type="checkbox" id="inactive" value="Inactive" v-model="userData.status">
            <label for="inactive">Inactive</label>
        </div>
        <div class="form-group-1">
            <label for="type">Type</label>
            <select v-model="userData.type">
                <option disabled value="">Please select one</option>
                <option>Environmental</option>
                <option>Food</option>
                <option>Medication</option>
                <option>Unknown</option>
            </select>
        </div>

        <input type="submit" value="Update" class="btn btn-block" />
    </form>






    </div>
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
                section: 'allergies',
                userData: {
                    id: '',
                    name: '',
                    onset_date: null,
                    reactions: '',
                    status: [],
                    type: '',

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
                        onset_date : this.userData.onset_date,
                        reactions: this.userData.reactions,
                        status: this.userData.status,
                        type : this.userData.type
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
                this.userData.onset_date = null,
                this.userData.reactions = '',
                this.userData.status = [],
                this.userData.type = ''

            }
        }
    }

</script>

<style>

</style>