<template>
  <div>
    <NavBar/>
    <br>
    <b-form>
    <b-form-input 
    type="email" 
    placeholder="Enter E-mail" 
    v-model='$store.state.user.email'
    style="max-width:300px align-items:center"
    @keyup.enter="login"
    />
    <br>
    <b-form-input
    type="password" 
    placeholder="Enter Password" 
    v-model="$store.state.user.password"
    @keyup.enter="login"
    />
    <br>
    
    <b-button @click='login' variant='primary'>Login</b-button>
    <b-button @click='back' variant='danger'>Home</b-button>
    <b-button @click="signup" variant='secondary'>Sign up</b-button>
    </b-form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components:{
    NavBar
  },
  methods:{
    login(){
      this.$store.dispatch('LoginProcess');
    },
    back(){
      this.$store.commit('logout')
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