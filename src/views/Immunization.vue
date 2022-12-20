<template>
    <div class="immunizations">
    

    <header>
      <!-- <h3>Profile</h3> -->
      <h4>Immunizations</h4>
    </header>    
    
    <form @submit="onSubmit" class="add-form">
    

        <div class="form-group-1">
            <label for="date_received">Date Received</label>
            <Datepicker v-model="userData.date_received" format="MM/dd/yyyy" class="datepicker"></Datepicker>
        </div>
        <div class="form-group-1">
            <label for="immunization_type">Immunization</label>
            <input type="text"
                id="immunization_type"
                class="form-control"
                v-model.lazy="userData.immunization_type">
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
            <select v-model="userData.immunization_status">
                <option disabled value="">Please select one</option>
                <option>Received</option>
                <option>Declined</option>
                <option>On Hold</option>
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
                section: 'immunizations',
                userData: {
                    id: '',
                    provider: '',
                    date_received: null,
                    immunization_type: '',
                    immunization_status: []

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
                        date_received : this.userData.date_received,
                        immunization_type: this.userData.immunization_type,
                        immunization_status: this.userData.immunization_status
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
                this.userData.date_received = null,
                this.userData.immunization_type = '',
                this.userData.immunization_status = []

            }
        }
    }

</script>

<style>

</style>