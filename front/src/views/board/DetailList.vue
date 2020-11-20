<template>
<div>
  <div>
    제목:{{$store.state.title}}
    <br>
    작성자:{{$store.state.writer}}
    <br>
  </div>
  <hr>
<viewer
  height = '500px'
  v-if='$store.state.contents != null' 
  :initialValue="$store.state.contents "
/>

<br><hr>
<div>
  <button @click="back">목록보기</button>
  <button @click='onDelete'>삭제</button>
  <button @click='onUpdate'>수정하기</button>
</div>
<hr><br>

<div>
  <Comments :id="this.$route.query.id"></Comments>
</div>
</div>  
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Editor's Style
import { Viewer } from '@toast-ui/vue-editor'
import Comments from '@/views/board/Comments'
export default {
 components: { 
   viewer: Viewer,
   Comments : Comments
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
         window.location.reload();
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