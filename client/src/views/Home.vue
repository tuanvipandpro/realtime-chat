<template>
  <div class="home">
    <el-dialog v-model="nameDialog" :before-close="handleClose">
      <template #title>
        <h2>What's your name ?</h2>
      </template>
      <el-input style="width: 90%" placeholder="What's your name ?" v-model="clientName"/>
      <el-button style="margin-left: 1%" type="success" @click="handleClose">OK</el-button>
    </el-dialog>
    <div v-if="!nameDialog" id="chat-container" style="text-align: center">
      <h1>Chat Service</h1>
      <el-button type="primary" plain @click="createRoom">Create Room</el-button>
      <el-button type="success" plain @click="open">Join Room</el-button>
    </div>
  </div>
</template>

<script>
// import { io } from 'socket.io-client'

export default {
  name: 'Home',
  data() {
    return {
      nameDialog: true,
      clientName: '',
      message: '',
      socket: ''
    }
  },
  mounted() {
    // const socket = io('http://localhost:3000')
    
    // socket.on('abc', data => {
    //   console.log(data)
    // })

    // this.socket = socket
  },
  methods: {
    handleClose () {
      if (!this.clientName) {
        this.$notify.error({
          title: 'Error',
          message: 'Please input your name !!!'
        })
        return
      }
      else {
        this.$notify.success({
          title: 'Success',
          message: `Welcome, ${this.clientName}`
        })        
        this.nameDialog = false
      }
    },
    open () {
      this.$prompt('Please input room id', 'Room ID', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(value => {
        this.transitTo('ChatRoom', {value, clientName: this.clientName})
      })
    },
    createRoom () {
      const roomId = `${(Math.random() * 100000000).toFixed(0)}`
      this.transitTo('ChatRoom', {roomId, clientName: this.clientName})
    },
    transitTo (name, data) {
      const param = {
        name: name,
        params: data
      }
      this.$router.push(param)
    },    
  }
}
</script>
<style lang="scss">
  .chat-card {
    .el-card {
      height: 88vh;
    }
  }
</style>