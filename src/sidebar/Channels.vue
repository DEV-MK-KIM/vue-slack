<template>
  <div>
    <h4 style="color:white;">#Channels</h4>
    <button class="btn btn-outline-light btn-sm" @click="showModal = true">Add Channel</button>
    <button v-for="channel in channels" :key="channel.name" class="btn list-group-item list-group-item-action mt-2 btn-sm" type="button" :class="{'active': setActiveChannel(channel)}" @click="changeChannel(channel)">{{ channel.name }}</button>
    <!-- Modal -->
    <Modal v-if="showModal">
      <!-- header -->
      <h3 slot="header" class="ml-3">Add Channel</h3>


      <!-- body -->

      <div class="form-group" slot="body">
        <input class="form-control" placeholder="Channel Name" v-model="newChannel" @keydown.enter = "addChannel" />
        <ul class="list-group" v-if="errors">
          <li class="list-group-item text-danger" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <!-- footer -->

      <div slot="footer" class="align-center">
        <button class="btn btn-outline-primary mr-2" @click="addChannel">Create</button>
        <button class="btn btn-outline-danger mr-4" @click="showModal = false">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/Modal";
import database from "firebase/database";
import { mapGetters } from 'vuex';


export default {
  name: "channels",
  data() {
    return {
      showModal: false,
      newChannel: "",
      errors: [],
      channels:[],
      channel:'',
      channelsRef: firebase.database().ref("channels")
    };
  },
  computed: {
    ...mapGetters(['currentChannel']),
    // return value: Boolean : if there's an error
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  components: {
    Modal
  },
  methods: {
    addChannel() {
      this.errors = [];
      let key = this.channelsRef.push().key;
      let newChannel = { id: key, name: this.newChannel };
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.newChannel = "";
          this.showModal = false;
        })
        .catch(err => {
          this.errors.push(err.message);
        });

    },
    addListners(){
        this.channelsRef.on('child_added', (snapshot)=>{
            this.channels.push(snapshot.val());
 
            // set current channel
            if(this.channels.length > 0){
            this.channel = this.channels[0];
            this.$store.dispatch('setCurrentChannel', this.channel)
            }
        })
    },
    setActiveChannel(channel){
        return channel.id === this.currentChannel.id;
    },
    detachListeners(){
        this.channelsRef.off();
    },
    changeChannel(channel){
        this.$store.dispatch('setCurrentChannel', channel);
        // 채널간의 이동은 prviate을 false로 set.  private messaging만 true로 한다.
        this.$store.dispatch('setPrivate', false)
    }
    
  },
  mounted(){
      this.addListners()
  },
  beforeDestroy(){
      this.detachListeners()
  }
};
</script>

<style>
</style>