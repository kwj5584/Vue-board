<template>
  <div>
    <table class='commentlist'>
    <tbody v-for='(list) in commentList' :key='list.idx'>
      <tr class>
        <td >{{list.id}} : </td>
        <td style="max-width:500px">{{list.contents}}</td>
        <b-button size='sm' @click='deleteComment(list)' class='ml-2'>삭제</b-button>
        <!-- <button @click="updateComment(list)">수정</button> -->
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
      document.location.href;
    }).catch(err=>{
      console.log(err);
    })
  },
  props:['id','comments.password'],
  data(){
    return{
      commentList:[]
    }
  },
  methods:{
    deleteComment(list){
      const wantDelete = list._id;
      const boardNum = this.$props.id;
      const commentDelete = prompt('비밀번호를 입력하세요');
      if( commentDelete === list.password){
        axios.post('http://localhost:3000/board/deleteComment',{wantDelete,boardNum})
      .then(()=>{
        alert('삭제되었습니다.')
        document.location.href;
      }).catch(err=>{
        console.log(err);
      })
      }
      else{
        alert('비밀번호가 틀립니다.')
      }
    },
    // updateComment(list){
    //   const wantUpdate = list._id
    //   const boardNum = this.$props.id;
    //   axios.patch('http://localhost:3000/board/updateComment',{wantUpdate,boardNum})
    //   .then(()=>{
    //     window.location.reload();
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    // }
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