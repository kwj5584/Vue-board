<template>
  <div>
    <h4 style="text-align:center">SignUp Page</h4>
    <b-form>
      <br>
     <b-form-input
          label='E-mail'
          v-model="$store.state.user.email"
          type="email"
          required
          placeholder="Enter email"
        />
    <!-- <input  
    type='text'
    v-model="$store.state.user.name"
    placeholder="Name"
    required
    /> -->
    <br>
     <b-form-input
          v-model="$store.state.user.password"
          type="password"
          required
          placeholder="Enter Password"
        />
    <br>
     <b-form-input
          v-model="$store.state.user.passwordConfirm"
          type="password"
          required
          placeholder="Password Confirm"
          @keyup.enter="submit"
        />
    <br>
     <b-button @click="submit" variant="primary">Submit</b-button>
      <b-button @click="back" variant="danger">Home</b-button>
      </b-form>
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
      this.$router.push({name:"Home"});
    }
  }
}
</script>

<style>

</style>