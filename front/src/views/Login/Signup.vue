<template>
  <div>
    <label name='E-mail'>
    <input 
    type="email"
    v-model="$store.state.user.email"
    placeholder="E-mail"
    required
    />
    </label>
    <br>
    <!-- <input  
    type='text'
    v-model="$store.state.user.name"
    placeholder="Name"
    required
    /> -->
    <br>
    <input type="password"
    v-model="$store.state.user.password"
    placeholder="Password"
    required
    >
    <br>
    <input type="password"
    v-model="$store.state.user.passwordConfirm"
    placeholder="PasswordConfirm"
    required
    @keyup.enter="submit"
    >
    <br>
    <button @click='submit'>SignUp</button>
    <button @click='back'>Reset</button>
  </div>
</template>

<script>
export default {
  methods:{
    submit(){
      if(this.$store.state.user.password !== this.$store.state.user.passwordConfirm){
        alert('비밀번호를 확인하세요');
      }
      else{
        this.$store.dispatch('SignupProcess');
      }
    },
    back(){
      this.$store.commit('logout');
      this.$router.push({name:"Home"});
    }
  }
}
</script>

<style>

</style>