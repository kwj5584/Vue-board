<template>
  <div>
    <table class='commentlist'>
      <thead>
      <tr class='tr'>
        <th>id</th>
        <th>contents</th>
      </tr>
      </thead>
    <tbody v-for='(list) in commentList' :key='list.idx'>
      <tr class='tr'>
        
        <td class='td'>{{list.id}}</td>
        <td class='td'>{{list.contents}}</td>
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
  margin:auto;
  justify-content: center;
  position:absolute;
  left:35%;
  top:60%
}
.tr{
  border:1px solid black;
  text-align:center;
}
.td{ 
  border: 1px solid black;
  text-overflow:clip;
}
</style>