<template>
  <div >
    <br>
  <div class='comment'>
  <form>
<input
  type="text"
  placeholder="ID"
  v-model="comments.id"
  style="width:100px"
>
<input
 type="password" 
 placeholder="Password" 
 style="width:150px"
 v-model="comments.password"
>
<br><br>
<textarea
 v-model='comments.contents' 
 placeholder="내용 입력" cols="40" rows="2"></textarea>
<b-button size='sm' variant='primary' @click ='register'>등록</b-button>
</form>
</div>
  <hr>
    <CommentList :id="$props.id"/>
  
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
      }).then(()=>{
        this.comments.id='';
      this.comments.password='';
      this.comments.contents=''
      window.location.reload()
      }).catch(err=>{
        console.log(err)
      })
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