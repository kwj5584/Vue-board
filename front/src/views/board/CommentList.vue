<template>
  <div>
    <table class='commentlist'>
      <thead>
      <tr class='tr'>
      
      </tr>
      </thead>
    <tbody v-for='(list) in commentList' :key='list.idx'>
      <tr class='tr'>
        <td >{{list.id}} : </td>
        <td >{{list.contents}}</td>
        <button @click='deleteComment(list)' class='td'>삭제</button>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
   const payload = this.$props.id
   console.log('getcommentlist : ',payload)
    axios.post('http://localhost:3000/board/getComments',{payload})
    .then((res)=>{
      this.commentList = res.data;
    }).catch(err=>{
      console.log(err);
    })
  },
  props:['id'],
  data(){
    return{
      commentList:[]
    }
  },
  methods:{
    deleteComment(list){
      const wantDelete = list._id;
      const boardNum = this.$props.id;
      axios.post('http://localhost:3000/board/deleteComment',{wantDelete,boardNum})
      .then(()=>{
        alert('삭제되었습니다.')
        window.location.reload();
      })
    }
  }
}
</script>

<style>
.commentlist{
  /* margin:auto; */
  /* justify-content: center; */
  position: relative;
  /* left:35%; */
  
}

</style>