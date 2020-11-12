<template>
<div>
  <textarea v-model='$store.state.title' cols='40' placeholder="제목 입력"/>
  <br>
  <editor
    initialEditType= wysiwyg
    :options = $store.state.editorOptions
    height = 500px
    ref='toastuiEditor'
  /> 
  <br>
  <div>
    <button @click='onAdd'>등록</button>
    <button @click='Back'>취소</button>
  </div>
  </div> 
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor'

export default {
  components: {
    'editor': Editor,
  },

  methods:{
    async onAdd(){
      try{
      if(this.$store.state.title === ''){
        alert("제목을 입력해주세요")
      }
      else if(this.$refs.toastuiEditor.invoke('getMarkdown') === ''){
        alert('내용을 입력해주세요')
      }
      else{
        const content1= this.$refs.toastuiEditor.invoke('getMarkdown')
        this.$store.dispatch('listAdd',content1);
  
        this.$router.push({name:'Home'});
        window.location.reload();
      }
      }catch(err){
        console.log(err);
      } 
      
    },
    Back(){
      this.$router.push({name:'Home'})
    }
  }
}

</script>

<style>

</style>