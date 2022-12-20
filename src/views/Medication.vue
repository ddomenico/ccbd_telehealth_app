<template>
    <div class="medication">
    

    <header>
      <!-- <h3>Profile</h3> -->
      <h4>Medication</h4>
    </header>    
    
    <form @submit="onSubmit" class="add-form">
    

        <div class="form-group-1">
            <label for="medication_name">Medication</label>
            <input type="text"
                id="medication_name"
                class="form-control"
                v-model.lazy="userData.medication_name">
        </div>
        <div class="form-group-1">
            <label for="provider">Provider</label>
            <input type="text"
                id="provider"
                class="form-control"
                v-model="userData.provider">
        </div>
        <div class="form-group-1">
            <label for="status">Status</label>
            <input type="checkbox" id="active" value="Active" v-model="userData.medication_status">
            <label for="active">Active</label>
            <input type="checkbox" id="inactive" value="Inactive" v-model="userData.medication_status">
            <label for="inactive">Inactive</label>
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
                section: 'medication',
                userData: {
                    id: '',
                    provider: '',
                    medication_name: '',
                    medication_status: []

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
                        provider : this.userData.provider,
                        medication_name: this.userData.medication_name,
                        medication_status: this.userData.medication_status
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
                this.userData.provider = '',
                this.userData.medication_name = '',
                this.userData.medication_status = []

            }
        }
    }

</script>

<style>

</style>