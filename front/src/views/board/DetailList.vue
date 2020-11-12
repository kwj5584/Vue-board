<template>
<div>
  <div>
    제목:{{this.$store.state.title}}
    <br>
    <!-- 작성자:{{this.$store.state.user.name}} -->
    <br>
  </div>
  <hr>
<viewer
  height = '500px'
  v-if='this.$store.state.contents != null' 
  :initialValue="this.$store.state.contents "
/>

<br><hr>
<div>
  <button @click="back">목록보기</button>
  <button @click='onDelete'>삭제</button>
  <button @click='onUpdate'>수정하기</button>
</div>
</div>  
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Editor's Style
import { Viewer } from '@toast-ui/vue-editor'

export default {
 components: { 
   viewer: Viewer
    },
    created(){
      const getId = this.$route.query.id
      this.$store.dispatch('detailPage',getId)
      },
    methods:{
      back(){
      this.$router.push({name:'Home'})
    },
      onDelete(){
        // const passwd = prompt('비밀번호 입력');
        const getId = this.$route.query.id
        this.$store.dispatch('deleteList',getId);
          alert("삭제되었습니다.")
          this.$router.push({name:'Home'})
          window.location.reload();  
        // if(this.$store.state.user.password === passwd){
          
        // }
        // else{ alert('비밀번호가 다릅니다.');}
       },

      onUpdate(){
          this.$router.push({name : 'UpdatePage', query: { id: this.$route.query.id }})
        // const passwd = prompt('비밀번호를 입력하세요');
      //   if(this.$store.state.user.password === passwd){

      //  }
      //  else{
      //    alert('비밀번호가 다릅니다.');
      //    window.location.reload();
      //  }
      // }
    }
    }
};
</script>

<style>

</style>