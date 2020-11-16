<template>
  <div>
    <button @click="login">로그인</button>
    <button @click="signup">회원가입</button>
    <List/>
  </div>
</template>

<script>
import List from '@/views/board/List'

export default {
  components: {
    List, 
  },
  data(){
    return{
    }
  },
  methods:{
    login(){
      this.$router.push({name:"Login"})
    },
    signup(){
      this.$router.push({name:"Signup"})
    }
  }
}
</script>
