import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title : '',
    contents : null,
    results : [],
    isLogin : 'Y',

    user:{
      name:'',
      email:'',
      password:'',
      passwordConfirm:''
    },

    editorOptions:{
      useCommandShortcut:false,
             usageStatistics:true,
             useDefaultHTMLSanitizer:false, // 아마도 html 태그 관련인듯?
             hideModeSwitch:true, // markdown, wysiwyg 선택하는 스위치
    }

  },
  mutations: {
    allClear(){
      this.state.title='';
      this.state.contents=null;
    },
    successGetList(state,payload){
      state.results = payload;
    },
    successDetailList(state,payload){
      state.title = payload.title;
      // state.user.name = payload.user.name;
      state.contents = payload.contents;
    }
  },
  actions: {
    getList(context){
    axios.get('http://localhost:3000/board/getList')
      .then((res)=>{
        context.commit('successGetList',res.data);
      }).catch(err=>{
        console.log(err);
      })
      context.commit('allClear')
  },

    listAdd(context,payload){
      axios.post('http://localhost:3000/board/listAdd',{
        title : this.state.title,
        contents : payload        
      })
    },
    detailPage(context,payload){
      console.log('action id :',payload)
      axios.get(`http://localhost:3000/board/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },

    deleteList(context,payload){
      console.log(payload)
      axios.delete(`http://localhost:3000/board/delete?id=${payload}`)
      .then(()=>{
        alert('삭제되었습니다.')
      }).catch(err=>{
        console.log(err);
      })
    },
    
    updateProcess(context,payload){
      axios.get(`http://localhost:3000/board/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },

    updateList(context,{getId,con}){
      axios.patch(`http://localhost:3000/board/updatePage?id=${getId}`,{
        getId,
        title : this.state.title,
        contents : con
      })
    }
  },

    SignupProcess(){
      axios.post('http://localhost:3000/user/signup',{
        email:this.state.user.email,
        name:this.state.user.name,
        password:this.state.user.password
      }).then(()=>{
        this.state.isLogin = 'Y';
        this.state.user.email='';
        this.state.user.password='';
      }).catch( (err) =>{
        console.log(err);
      })
    },

    LoginProcess(){
      axios.post('http://localhost:3000/user/login',{
        email: this.state.user.email,
        password:this.state.user.password
      }).then(()=>{
        alert('로그인 성공');
        this.$router.push({name:"Home"})
      }).catch(err=>{
        console.log(err);
      })
      },


  modules: {
  }
})
