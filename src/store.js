import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentChannel: null,
    isPrivate: false, 

  },
  getters: {
    currentUser: state=> 
      state.currentUser,
    currentChannel: state=> state.currentChannel,
    isPrivate: state=> state.isPrivate
    
  },

  mutations: {
    SET_USER(state, user){
      state.currentUser = user;
    },
    SET_CHANNEL(state, channel){
      state.currentChannel = channel;
    },
    SET_PRIVATE(state, isPrivate){
      state.isPrivate = isPrivate
    }
  

  },
  actions: {
    setUser(context, user){
      context.commit('SET_USER', user);
    },
    setCurrentChannel({commit},channel){
      commit('SET_CHANNEL', channel);
    },
    setPrivate({commit}, isPrivate){
      commit('SET_PRIVATE', isPrivate)
    }


  }
})
