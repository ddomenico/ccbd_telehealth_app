<template>
  <card class="card-user">
    <div>
      <div class="author">
        <img class="avatar border-white" src="../assets/blank-profile-picture.png" alt="...">
        <h4 class="title">PATIENT NAME: {{patient.name}}
          <br>
          <a>
            <small>PATIENT ID: {{patient.patient_id}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        DOB:
        <br> {{patient.dob}}
      </p>
      <p class="description text-center">
        SEX:
        <br> {{patient.sex}}
      </p>
    </div>
    <hr>
    <h5 class="title">PRIOR APPOINTMENTS</h5>
    <div class="text-center">
      <div class="row">
        <div v-for="(info, index) in patient.past_diagnoses" :key="index" :class="getClasses(index)">
          <h5>{{info.date}}
            <br>
            <p><a v-bind:href="info.details" target="_blank">{{info.test_type}}</a></p>
          </h5>
        </div>
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
      patient: {},
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    }
  }
};
</script>
<style>
.avatar {
    width: 200px;
}
</style>
