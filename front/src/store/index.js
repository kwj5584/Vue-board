import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title : '',
    writer : '',
    password : '',
    contents : null,
    results : [],

    editorOptions:{
      useCommandShortcut:false,
             usageStatistics:true,
             useDefaultHTMLSanitizer:false, 
             hideModeSwitch:true, // markdown, wysiwyg 선택하는 스위치
             toolbarItems:[
               'heading',
                'bold',
                'italic',
                'strike',
                'divider',
                'hr',
                'quote',
                'divider',
                'ul',
                'ol',
                'task',
                'indent',
                'outdent',
                'divider',
                'table',
                'image',
                'link',
                'divider',
                'code',
                'codeblock'
             ],
    }

  },
  mutations: {
    allClear(){
      this.state.title='';
      this.state.writer='';
      this.state.password='';
      this.state.contents=null;
    },
    successGetList(state,payload){
      state.results = payload;
    },
    successDetailList(state,payload){
      state.title = payload.title;
      state.writer = payload.writer;
      state.password = payload.password;
      state.contents = payload.contents;
    }
  },
  actions: {
    getList(context){
    axios.get('http://localhost:3000/api/getList')
      .then((res)=>{
        context.commit('successGetList',res.data);
      }).catch(err=>{
        console.log(err);
      })
      context.commit('allClear')
  },

    listAdd(context,payload){
      axios.post('http://localhost:3000/api/listAdd',{
        title : this.state.title,
        writer : this.state.writer,
        password : this.state.password,
        contents : payload        
      })
    },
    detailPage(context,payload){
      console.log('action id :',payload)
      axios.get(`http://localhost:3000/api/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },

    deleteList(context,payload){
      console.log(payload)
      axios.delete(`http://localhost:3000/api/delete?id=${payload}`)
      .then(()=>{
        alert('삭제되었습니다.')
      }).catch(err=>{
        console.log(err);
      })
    },
    
    updateProcess(context,payload){
      axios.get(`http://localhost:3000/api/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },

    updateList(context,{getId,con}){
      axios.patch(`http://localhost:3000/api/updatePage?id=${getId}`,{
        getId,
        title : this.state.title,
        writer : this.state.writer,
        password : this.state.password,
        contents : con
      })
    }





  },
  modules: {
  }
})
