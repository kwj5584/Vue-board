import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title : '',
    contents : null,
    findDetail : '',
    results : [],
    isLogin : 'N',

    user:{
      email:'',
      password:'',
      passwordConfirm:''
    },
    comments:[
    {
      commentsId:'',
      commentsPassword:'',
      commentsContents:''
    }
    ],

    editorOptions:{
      useCommandShortcut:false,
             usageStatistics:true,
             useDefaultHTMLSanitizer:false, // 아마도 html 태그 관련인듯?
             hideModeSwitch:true, // markdown, wysiwyg 선택하는 스위치
    }

  },
 
  mutations: {
    allClear(state){
      state.title='';
      state.contents=null;
    },
    successGetList(state,payload){
      state.results = payload;
      console.log(state.results)
    },
    successDetailList(state,payload){
      state.title = payload.title;
      // state.user.name = payload.user.name;
      state.contents = payload.contents;
    },
    successGetComments(state,payload){
      state.comments.push({
        commentsId:payload.commentsId,
        commentsPassword:payload.commentsPassword,
        commentsContents : payload.commentsContents
      })
      state.comments=''
    },
    signUpSuccess(state){
      // state.user.name='',
      state.user.email='',
      state.user.password='',
      state.user.passwordConfirm=''
    },
    loginSuccess(state,){
      console.log('loginsuccess Mutation')
      state.isLogin='Y'
      // console.log(state.user);
      //let username = state.user.email;
      //localStorage.setItem('username', username);
    },
    logout(state){
      // state.user.name='',
      state.user.email='';
      state.user.password='';
      state.user.passwordConfirm='';
      state.isLogin='N';
      // localStorage.clear()
    },
    successFindDetail(state,payload){
      state.results=payload;
    }

  },
  
  actions: {
    /* 게시판 관련 action */ 
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
        writer : this.state.user.email,
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
    },
  //   commentsRegister(context,{getId}){
  //     axios.post(`http://localhost:3000/board/detailList?id=${getId}`,{
  //       id : this.state.comments.id,
  //       commentsPassword : this.state.commentsPassword
  //     })
  //   },
  //   getComments(context,{getId}){
  //     axios.get(`http://localhost:3000/board/detailList?id=${getId}`)
  //     .then((res)=>{
  //     context.commit('successGetComments',res.data)
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // },
  FindDetailTitle(context,payload){
    console.log('payload is :',payload);
    axios.post('http://localhost:3000/board/findDetailTitle',{payload})
    .then((res)=>{
      console.log(res.data);
      context.commit('successFindDetail',res.data)
    }).catch(err=>{
      console.log(err);
    })
  },
  FindDetailWriter(context,payload){
    console.log('payload is :',payload);
    axios.post('http://localhost:3000/board/findDetailWriter',{payload})
    .then((res)=>{
      console.log(res.data);
      context.commit('successFindDetail',res.data)
    }).catch(err=>{
      console.log(err);
    })
  },
    /* 로그인 관련 action */
  SignupProcess(context){
      axios.post('http://localhost:3000/user/signup',{
        email:this.state.user.email,
        // name:this.state.user.name,
        password:this.state.user.password
      }).then(()=>{
        context.commit('signUpSuccess')
        router.push({name:"Login"})
        console.log('signup success')
      }).catch( (err) =>{
        console.log(err);
      }) 
    },

    LoginProcess(context){
      // let selectedUser = null;
      axios.post('http://localhost:3000/user/login',{
        email: this.state.user.email,
        password:this.state.user.password
      }).then(()=>{
        router.push({name:"Home"});
        context.commit('loginSuccess');
      }).catch(err=>{
        console.log(err);
      })
      },
    },

  modules: {
  },
  plugins:[
    createPersistedState()
  ]
})
