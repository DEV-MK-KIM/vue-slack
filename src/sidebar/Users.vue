<template>
    <div>
        <div>
            <h4>Users</h4>

                <div class="mt-4">
                    <button v-for="user in users" :key="user.uid" class="mt-2 btn-sm fixed-middle list-group-item list-group-item-action" type="button" :class="{'active': isActive(user)}" @click.prevent="changeChannel(user)">

                        <span class="mr-1 " 
                        :class="{'fa fa-circle online': user.uid === isOnline(user)
                        , 'fa fa-circle offline': user.uid !== isOnline(user)}"></span>
                        
                        <span>
                            <img class="img rounded-circle mx-1" :src="user.avatar" height="25" />
                            <span><a :class="{'text-light': isActive(user)}" href="#">{{ user.name }}</a></span>
                        </span>

                    </button>
                </div>

        </div>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import database from "firebase/database";
import { log } from "util";

export default {
  name: "users",
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("users"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentChannel"])
  },
  methods: {
    addListeners() {
      this.usersRef.on("child_added", snapshot => {
        // if (this.currentUser.uid !== snapshot.key) {
          // build user object and push to users[]
          let user = snapshot.val();
          user["uid"] = snapshot.key;
          user["status"] = "offline";
          this.users.push(user);
        // }
      });

      // presenceRef child added
      this.presenceRef.on("child_added", snapshot => {
        // if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key);
        // }
      });

      // presenceRef child removed
      this.presenceRef.on("child_removed", snapshot => {
        // if (this.currentUser.uid !== snapshot.key) {
          this.addStatusToUser(snapshot.key, false);
        // }
      });

      // returns 'connected' to every user connected to our application
      this.connectedRef.on("value", snapshot => {
        // snapshot.val() returns boolean value (true) if value is connected
        if (snapshot.val()) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
    },
    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        connected === true
          ? (this.users[index].status = "online")
          : (this.users[index].status = "offline");
      }
    },
    isOnline(user) {
      if(user.status === "online"){
        return true
      }
    },
    detachListners() {
      this.usersRef.off();
      this.connectedRef.off();
      this.presenceRef.off();
    },
    //to change channel, you need channel ID
    changeChannel(user){
      /// user1Id / user2ID
       let channelId = this.getChannelId(user.uid);
       let channel = {id: channelId, name: user.name}
        
      // private messaging => 채널을 유저/유저로 바꾼다
       this.$store.dispatch('setCurrentChannel', channel)
      // isPrivate 을 true로 바꾼다
       this.$store.dispatch('setPrivate', true)
    },
    isActive(user){
      let channelId = this.getChannelId(user.uid)
      return this.currentChannel.id === channelId;

    },
    getChannelId(userId){
      return (userId < this.currentUser.uid) ? userId+'/'+this.currentUser.uid : this.currentUser.uid+'/'+ userId
    }
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.detachListners();
  }
};
</script>


<style scoped>
h4{
  color:white;
}
    .online{color:green;}
    .offline{color:red;}
</style>

