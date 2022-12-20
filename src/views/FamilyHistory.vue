<template>
    <div class="familyhistory">
    

    <header>
      <!-- <h3>Profile</h3> -->
      <h4>Family History</h4>
    </header>    
    
    <form @submit="onSubmit" class="add-form">
    
        <div class="form-group-1">
            <label for="relationship">Relationship</label>
            <input type="text"
                id="relationship"
                class="form-control"
                v-model="userData.relationship">
        </div>
        <div class="form-group-1">
            <label for="condition">Condition</label>
            <input type="text"
                id="condition"
                class="form-control"
                v-model="userData.condition">
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
                section: 'family_history',
                userData: {
                    id: '',
                    relationship: '',
                    condition: ''
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
                        relationship: this.userData.relationship,
                        condition: this.userData.condition
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
                this.userData.relationship = '',
                this.userData.condition = ''

            }
        }
    }

</script>

<style>

</style>