<template>
<div>
  <NavBar/>
  <hr>
  <div>
    제목 : {{$store.state.title}}
    <br>
    작성자 : {{$store.state.writer}}
    <br>
  </div>
  <hr>
<viewer
    minHeight="500px"
    v-if='$store.state.contents != null' 
    :initialValue="$store.state.contents "
/>

<br><hr>
<div class='mt-3'>
  
    <b-button size='sm' @click="back">목록보기</b-button>
    <b-button size='sm' variant='danger' @click='onDelete'>삭제</b-button>
    <b-button size='sm' @click='onUpdate'>수정하기</b-button>
  
</div>
<hr>
<div>
  <Comments :id="this.$route.query.id"></Comments>
</div>
</div>  
</template>

<script>
import NavBar from '@/components/NavBar'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Editor's Style
import { Viewer } from '@toast-ui/vue-editor'
import Comments from '@/views/board/Comments'
export default {
 components: { 
   viewer: Viewer,
   Comments,
   NavBar
    },
    created(){
      const getId = this.$route.query.id
      this.$store.dispatch('detailPage',getId)
      console.log('작성자 : ',this.$store.state.writer, '로그인한 사람:',this.$store.state.nowUserInfo.email)
      },
    methods:{
      back(){
      this.$router.push({name:'Home'})
    },
      onDelete(){
        if(this.$store.state.writer === this.$store.state.nowUserInfo.email){
          const passwd = prompt('비밀번호 입력');
        const getId = this.$route.query.id
        if(this.$store.state.nowUserInfo.password === passwd){
        this.$store.dispatch('deleteList',getId);
          alert("삭제되었습니다.")
          this.$router.push({name:'Home'})
          window.location.reload();  
        }
        else{ 
          alert('비밀번호가 다릅니다.');
          }
        }
        else{
          alert('접근 권한이 없습니다.')
        }
       },

      onUpdate(){
        if(this.$store.state.writer===this.$store.state.nowUserInfo.email){
          const passwd = prompt('비밀번호를 입력하세요');
          if(this.$store.state.user.password === passwd){
          this.$router.push({name : 'UpdatePage', query: { id: this.$route.query.id }})
          }
        else{
         alert('비밀번호가 다릅니다.');
         this.$router.push({name:'DetailList', query:{id:this.$route.query.id}})
      //  }
      }
        }else{
          alert('접근 권한이 없습니다.')
        }
        
    },
    }
};
</script>

<style>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>