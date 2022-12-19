<template>
  <card class="card" title="Edit Profile">
    <hr>
    <div>
      <div class="infoblock">
        <h3 class="title">ADDRESS: 
            <small>{{patient.address}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">PHONE NUMBER: 
            <small>{{patient.contact}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">EMPLOYMENT: 
            <small>{{patient.employment}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">INSURANCE: 
            <small>{{patient.insurance}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">LANGUAGE(S): 
            <small>{{patient.language}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">RACE: 
            <small>{{patient.race}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">MARITAL STATUS: 
            <small>{{patient.marital}}</small>
        </h3>
      </div>
    </div>
    <div>
      <div class="infoblock">
        <h3 class="title">PHARMACY: 
            <small>{{patient.pharmacy}}</small>
        </h3>
      </div>
    </div>
  </card>
</template>
<script>
import Auth from '@aws-amplify/auth'
import axios from 'axios'

export default {
  mounted(){
    this.patientID = this.$route.params.patientID,
    Auth.currentUserInfo()
      .then(res => {
          this.userID = res.username;
          console.log(this.userID);
          axios.get('https://dq9js2i730.execute-api.us-east-1.amazonaws.com/prod/doctor/' + this.userID+ '/getPatientTable')
          .then(function(response)  { 
              this.patients = response.data;
              this.patient = this.patients.find(p => p.patient_id === this.patientID)
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
      patient: {}
    };
  },
};
</script>
<style>
</style>
