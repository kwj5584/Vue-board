<template>
  <div >
    <br>
  <div class='comment'>
<input
 type="text"
  placeholder="ID"
  v-model="comments.id"
>
<input
 type="password" 
 placeholder="Password" 
 v-model="comments.password"
>
<br><br>
<textarea
 v-model='comments.contents' 
 placeholder="내용 입력" cols="48" rows="5"></textarea>
 
<button @click ='register'>등록</button>
</div>
<template>
  <div>
    <CommentList :id="$props.id"/>
  </div>
  </template>
  </div>
  
</template>

<script>
import axios from 'axios'
import CommentList from './CommentList'
export default {
  components:{
    CommentList
  },
  data(){
    return{
      comments:{
        id:'',
        password:'',
        contents:''
      }
    }
  },
  // created(){
  //   console.log('props id:',this.$props.id);
  //   this.$store.dispatch('getComments',this.$props.id)
  // },
  props:['id'],
  methods:{
    register(){
      axios.post('http://localhost:3000/board/commentsRegister',{
        boardNum : this.$props.id,
        id : this.comments.id,
        password : this.comments.password,
        contents : this.comments.contents
      })
      this.comments.id='';
      this.comments.password='';
      this.comments.contents=''
      window.location.reload()
    }
    
  }
}
</script>

<style>
.comment{
  position: relative;
  /* left:30%; */
}
</style>