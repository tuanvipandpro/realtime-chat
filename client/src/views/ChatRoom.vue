<template>
  <el-card class="chat-card">
    <template #header><h2>Room :</h2></template>
  </el-card>
  <el-card style="margin-top: 1vh">
    <el-input
      style="width: 93%"
      placeholder="Enter your message "
      v-model="message"
    />
    <div id="chat"></div>
    <el-button style="margin-left: 1%" type="primary">Send</el-button>
  </el-card>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  name: 'ChatRoom',
  data() {
    return {
      roomId: '',
      clientName: '',
      message: '',
      socket: ''
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.clientName = this.$route.params.clientName

    const socket = io('http://localhost:3000')

    socket.emit('join-room', {roomId: this.roomId, clientName: this.clientName})

    socket.on('disconnect', name => {
      const msg = document.createElement('div')
      msg.innerText = `${name} is disconnect !!!`
      document.getElementById('chat').append(msg)
    })
  }
}
</script>