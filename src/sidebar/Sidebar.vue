<template>
  <div>
    <h2 class="text-light">#SLACK</h2>
    <hr class="horzLine" />
    <span>
      <img class="rounded-circle mr-3" height="30" :src="currentUser.photoURL" />
      <span class="text-light">{{ currentUser.displayName }}</span>
    </span>
    <div class="mt-4">
      <button class="btn btn-outline-light btn-sm" @click="logout">Logout</button>
    </div>
    <hr class="horzLine" />
    <Channels></Channels>
    <hr class="horzLine" />
    <Users></Users>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Channels from "./Channels";
import Users from "./Users";
import database from "firebase/database";

export default {
  name: "sidebar",
  components: {
    Channels,
    Users
  },
  data() {
    return {
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove();
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.horzLine {
  border: 1px solid #333;
}
</style>

