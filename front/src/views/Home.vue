<template>
  <div>
    <NavBar></NavBar>
    
    <br>
    <h6 v-if='$store.state.user.email !==""' style="text-align:center">
      반갑습니다 {{$store.state.user.email}}님
    </h6>
    <br>
    <List/>
  </div>
</template>

<script>
import List from '@/views/board/List'
import NavBar from '@/components/NavBar'
export default {
  components: {
    List, 
    NavBar
  },
  data(){
    return{
    }
  },
  
}
</script>
