<template>
    <div>
            <h2>Patient Table</h2>
            <div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Patient Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="patient in patients">
                        <td>{{patient.name}}</td>
                        <td><a :href="'/patient-' + patient.patient_id + '-report'">Report Link</a></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
    </div>
</template>
    
<script>    
    import axios from 'axios'
    import Auth from '@aws-amplify/auth'

    
    export default {
        name: 'patients',
        mounted(){

            Auth.currentUserInfo()
            .then(res => {
                this.userID = res.username;
                console.log(this.userID);
                
                axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/doctor/' + this.userID + '/getPatientTable')
                .then(function(response)  { 
                    this.patients = response.data;
                    console.log(response.data);
                }.bind(this)).catch(error => { 
                    console.log(error)
                })   
            })
            .catch(err => {
                console.error(err);
            })

        },
        data() {
            return {       
                patients: {},
                userID: "",
            }
        },
    }
    </script>