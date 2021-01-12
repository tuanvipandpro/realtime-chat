<template>
  <el-card class="chat-card">
    <template #header><h2>Room : {{ roomId }}</h2></template>
    <div id="chat" style="overflow-y: scroll;">
      <div v-for="(item, index) in msgList" :key="index">
        <div v-if="item.clientName">
          <strong >{{item.clientName}} :</strong>
          {{item.msg}}
        </div>
         
        <strong v-else>{{ item }}</strong>
      </div>
    </div>
  </el-card>
  <el-card style="margin-top: 1vh">
    <el-input
      style="width: 93%"
      placeholder="Enter your message "
      v-model="message"
      @keypress="checkEnter"
    />
    <el-button style="margin-left: 1%" type="primary" @click="sendMsg">Send</el-button>
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
      socket: '',
      msgList: []
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.clientName = this.$route.params.clientName

    this.appendMsg('You joined !!!')

    const socket = io('http://localhost:3000')

    socket.emit('join-room', {roomId: this.roomId, clientName: this.clientName})

    socket.on('new-user', clientNm => {
      if (clientNm != this.clientName) {
        this.appendMsg(`${clientNm} is joined !!!`)
      }
      
      this.$notify.success({
        title: 'Success',
        message: `${clientNm} is joined !!!`
      })       
    })

    // socket.on('new-msg', data => this.appendMsg(`${data.clientName} : ${data.msg}`))
    socket.on('new-msg', data => {
      this.appendMsg({clientName: data.clientName, msg: data.msg})
    })

    // socket.on('out-room', name => this.appendMsg(`${name} is disconnect !!!`))
    socket.on('out-room', name => {
      this.appendMsg(`${name} is disconnect !!!`)

      this.$notify.success({
        title: 'Success',
        message: `${name} is out !!!`
      }) 
    })

    this.socket = socket
  },
  methods: {
    appendMsg(data) {
      // const msgText = document.createElement('div')
      // msgText.innerText = msg
      // document.getElementById('chat').append(msgText)
      this.msgList.push(data)
    },
    sendMsg() {
      // this.appendMsg(`You : ${this.message}`)
      this.appendMsg({clientName: 'You', msg: this.message})
      this.socket.emit('send-msg', {roomId: this.roomId, msg: this.message, clientNm: this.clientName})
      this.message = ''
    },
    checkEnter(e) {
      if (e.keyCode === 13) this.sendMsg()
    }
  }
}
</script>
<style lang="scss">
  .chat-card {
    .el-card {
      height: 88vh;
    }

    #chat {
      height: 74vh;
    }
  }
</style>