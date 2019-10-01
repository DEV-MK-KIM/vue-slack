<template>
 
      <div class="body">
                    

          <div class="jumbotron-fluid bg-primary text-white py-5 my-4">
              <h3 class="lead display-3">#SLACK-VUE#</h3>
              <P>Realtime communication at it's best</P>
          </div>

          <div class="alert alert-info" v-if="loading">Processing</div>
          <div class="alert alert-danger" v-if="hasErrors">
              <div v-for="error in errors" :key="error">{{ error }}</div>
          </div>


 
          <div class="container-fluid">
              <div class="row mt-5">
                  <div class="col text-center">
                      <button class="btn btn-outline-danger" @click="loginWithGoogle">Login with Google</button>
                  </div>
                  
              </div>
              
          </div>
      </div>
  
</template>

<script>
import auth from 'firebase/auth'
import database from 'firebase/database'
export default {
    name: 'login',
    data(){
        return {
            errors:[],
            loading: false,
            usersRef: firebase.database().ref('users'),
        }

    },
    computed:{
        // return value: Boolean : if there's an error
        hasErrors(){
            return this.errors.length >0
        },

    },
    methods: {
        loginWithGoogle(){
            this.loading = true;
            this.errors = [];
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then((res) => {
                this.saveUserToUsersRef(res.user)
                this.$store.dispatch('setUser', res.user);
                this.$router.push('/');
            })
            .catch((err)=>{
                this.errors.push(err.message);
                this.loading = false;
            })
         
        },
        saveUserToUsersRef(user){
                return this.usersRef.child(user.uid).set({
                    name: user.displayName,
                    avatar: user.photoURL,
                });
            }
    }

}
</script>

<style scoped>

.body {
     text-align: center;
  
}
.jumbotron-fluid{
    height: 20rem
}
</style>