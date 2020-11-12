<template>
  <div>
    <input type="email" placeholder="Enter E-mail" v-model='$store.state.user.email'>
    <br>
    <input type="password" placeholder="Enter Password" v-model="$store.state.user.password">
    <br>
    
    <button @click='login'>Login</button>
    <button @click='back'>reset</button>
    <button @click="signup">Sign up</button>
  </div>
</template>

<script>
export default {
  methods:{
    login(){
      this.$store.dispatch('LoginProcess');
      
    },
    back(){
      this.$router.push({name:"Home"})
    },
    signup(){
      this.$router.push({name:'Signup'})
    }
  }
}
</script>

<style>

</style>