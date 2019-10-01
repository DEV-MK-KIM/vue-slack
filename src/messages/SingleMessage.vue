<template>
    <div class="mt-3 mb-5">
    <div v-for="message in messages" :key="message.id">
      <div class="media">
        <img :src="message.user.avatar" height="50" width="50" class="align-self-start mr-3">
        <div class="media-body">
          <h6 class="mt-0">
            <a href="">{{ message.user.name }}</a> - {{ message.timestamp | fromNow }}
          </h6>
          <p :class="{'self_message' : selfMessage(message.user)}">{{ message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props:['messages'],
  computed:{
     ...mapGetters(['currentUser']),
  },
  methods: {
    selfMessage(user){
      return user.id === this.currentUser.uid}
  
  },
  filters: {
    date: (value)=> moment(value).format('LL')
  }

}
</script>

<style scoped>
.content{
text-align: left;
}

.self_message{
  border-left:5px solid red;
  padding: 0 10px;
}
</style>