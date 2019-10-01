<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 sidebar">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-8 content">
        <Messages></Messages>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from '../sidebar/Sidebar.vue'
import Messages from '../messages/Messages.vue'
export default {
    name: 'chat',
    components:{
      Sidebar,
      Messages,
    }
}
</script>

<style scoped>
.sidebar {
  width: 34%;
  display: block;
  float: left;
  position: fixed;
  height: 100%;
  background-color: black;
  padding-top: 2em;
  overflow: scroll;

}
.content {
  width: 66%;
  display:block;
  float: left;
  margin-left: 34%;
}
</style>