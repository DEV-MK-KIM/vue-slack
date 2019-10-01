import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import auth from 'firebase/auth'

Vue.config.productionTip = false;

  var firebaseConfig = {
    apiKey: "AIzaSyAzj9JuLUzblLwJsqjHLnNLl6HJTi4ETms",
    authDomain: "slack-vue-f5b7b.firebaseapp.com",
    databaseURL: "https://slack-vue-f5b7b.firebaseio.com",
    projectId: "slack-vue-f5b7b",
    storageBucket: "",
    messagingSenderId: "736940009075",
    appId: "1:736940009075:web:9ec05660b0c3c17a"
  };
  firebase.initializeApp(firebaseConfig);

  window.firebase = firebase;

  const unsubscribe = firebase.auth().onAuthStateChanged(user=>{

    store.dispatch('setUser', user);

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

    // Recursion = this function calls itself on auth state change
    unsubscribe();

  })



