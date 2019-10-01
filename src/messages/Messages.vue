<template>
  <div>
<!-- show single messages  -->
<SingleMessage :messages="messages"></SingleMessage>
<!-- message form -->
<MessageForm></MessageForm>

 </div>
</template>

<script>
import MessageForm from './MessageForm'
import SingleMessage from './SingleMessage'
import database from "firebase/database";
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      messagesRef: firebase.database().ref('messages'),
      messages:[],
      privateMessagesRef: firebase.database().ref('privateMessages'),
      channel:'',
    }
  },
    components:{
        MessageForm,
        SingleMessage,
    },
    computed: {
      ...mapGetters(['currentChannel','currentUser','isPrivate'])
    },
    watch:{
      currentChannel: function(){
        // if this.messages is not cleared, all messages from other channel will be displayed.
        this.messages = [];
                this.addListeners()
                this.channel = this.currentChannel
      }
    },
    methods: {
            addListeners() {

                let ref = this.getMessagesRef()
                // listen to child added events on current channel
                ref.child(this.currentChannel.id).on('child_added', (snapshot) => {
                    let message = snapshot.val()
                    message['id'] = snapshot.key
                    this.messages.push(message)

                    // automatically scrolls down the latest message in chat window
                     this.$nextTick(()=>{
                    $('html,body').scrollTop($(document).height())
                  })
                    
                })
            },

      detachListeners(){
        if(this.channel !== null){
          this.messagesRef.child(this.channel.id).off()
        }
      },
      getMessagesRef(){
        if(this.isPrivate){
          return this.privateMessagesRef 
      } else {
        return this.messagesRef
      }
    },

    beforeDestroy(){
      this.detachListeners()
    }
}
}


</script>

<style>

</style>