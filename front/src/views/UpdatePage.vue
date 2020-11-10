<template>
  <div>
    <textarea v-model='$store.state.title' cols='40' placeholder="제목 입력"/>
  <br>
  <span>
    <input v-model='$store.state.writer' placeholder="작성자"/>
    <input type='password' v-model='$store.state.password' placeholder="비밀번호"/>
  </span>
  <editor
    v-if="$store.state.contents != ''"
    :initialValue = '$store.state.contents'
    initialEditType= wysiwyg
    :options = '$store.state.editorOptions'
    height = 500px
    ref='toastuiEditor'
    
  /> 
  <br>
  <div>
    <button @click='onUpdate'>수정</button>
    <button @click='back'>취소</button>
  </div>
  
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor'

export default {
  components:{
    'editor' : Editor
  },
  
  created(){
    const getId = this.$route.query.id;
    this.$store.dispatch('updateProcess',getId);

  },
    methods:{
      back(){
        this.$router.push('/');
      },

      async onUpdate(){
        const getId = this.$route.query.id
      if(this.title === ''){
        alert("제목을 입력해주세요")
      }
      else if(this.writer === ''){
        alert("아이디를 입력해주세요")
      }
      else if(this.password === ''){
        alert("비밀번호를 입력해주세요")
      }
      else if(this.$refs.toastuiEditor.invoke('getMarkdown') === ''){
        alert('내용을 입력해주세요')
      }
      else{
        const con = this.$refs.toastuiEditor.invoke('getMarkdown')
        this.$store.dispatch('updateList',{getId, con});
        this.$router.push('/');
      }
      }
    }
}

</script>

<style>

</style>