<template>
  <div>
    <div class="messageform">
      <form @submit.prevent="sendMessages">
        <div class="input-group mb-3 ">
          <input
            v-model.trim="message"
            name="message"
            id="message"
            type="text"
            class="form-control mt-3"
            placeholder="type something..."
            autofocus
          />
          <div class="input-group-append">
            <button class="btn btn-primary mt-3" @click="sendMessages" type="button">Send</button>
          </div>
          <div class="input-group-append">
            <button class="btn btn-warning mt-3" type="button">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            message:'',
            errors:[],
        }
    },
    methods: {
        sendMessages(){
           // custruct new message object
        let newMessage= {
            content: this.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                name: this.currentUser.displayName,
                avatar: this.currentUser.photoURL,
                id: this.currentUser.uid,             
            }
        }
        if(this.currentChannel !== null){
            if(this.message.length > 0){
                // messagesRef = firebase.database().ref("messages")
                this.$parent.getMessagesRef().child(this.currentChannel.id).push().set(newMessage)
                .then(()=>{
                  // scroll messages to top
                  this.$nextTick(()=>{
                    $('html,body').scrollTop($(document).height())
                  })
                })
                .catch((err)=>{
                    this.errors.push(err.message);
                })
                this.message ='';
            }
        }
        },

    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser'])

    }

    
};
</script>

<style scoped>
.messageform {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: white;
  text-align: center;
  margin-bottom: -20px;
  margin-left: 33.3%;
}
input,
button {
  height: 50px;
}
.progress {
  margin-bottom: -16px;
}
</style>