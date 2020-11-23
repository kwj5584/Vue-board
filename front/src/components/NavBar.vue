<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Home</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      
    </b-navbar-toggle>

      <b-collapse id='navbar-toggle-collapse' is-nav right>
        <b-navbar-nav class='ml-auto'>
          <b-nav-item v-if="$store.state.user.email===''" @click='login'>로그인</b-nav-item>
          <b-nav-item v-if="$store.state.user.email!==''" @click='logout'>로그아웃</b-nav-item>
          <b-nav-item @click='signup'>회원가입</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!-- Right aligned nav items -->
      
  </b-navbar>
</div>
</template>

<script>
export default {
methods:{
    login(){
      this.$router.push({name:"Login"})
    },
    signup(){
      this.$router.push({name:"Signup"})
    },
    logout(){
      this.$store.commit('logout')
      window.location.reload();
    }
  }
}
</script>

<style>

</style>