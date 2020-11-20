import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title : '',
    writer :'',
    contents : null,
    findDetail : '', // 조회 조건
    results : [],
    isLogin : 'N',

    nowUserInfo:{
      email:'',
      password:'' //현재 로그인한 유저 정보
    },

    user:{
      email:'',
      password:'',
      passwordConfirm:'' //회원가입 정보
    },

    // comments:{
    //   id:'',
    //   password:'',
    //   contents:''
    // },

    commentsList:[],

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
      state.writer = payload.writer;
      state.contents = payload.contents;
    },
    commentRegisterSuccess(state){
      state.comments='';
    },
    // successGetComments(state,payload){
    //   state.comments.push({
    //     id:payload.id,
    //     password:payload.password,
    //     contents : payload.contents
    //   })
    //   state.comments=''
    // },
    signUpSuccess(state){
      // state.user.name='',
      state.user.email='',
      state.user.password='',
      state.user.passwordConfirm=''
    },
    loginSuccess(state){
      console.log('loginsuccess Mutation')
      state.isLogin='Y'
      state.nowUserInfo.email = state.user.email
      state.nowUserInfo.password = state.user.password

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
    // commentsRegister(context,payload){
    //   console.log('store getid : ',payload)
    //   axios.post(`http://localhost:3000/comments/commentsRegister?id=${payload}`,{
    //     payload,
    //     id : this.state.comments.id,
    //     password : this.state.comments.password,
    //     contents : this.state.comments.contents
    //   }) // 디비에 저장
    //   },
      /** 댓글 가져오기 */
  //   getComments(context,payload){
  //     axios.get(`http://localhost:3000/comments/getComments?id=${payload}`,{payload})
  //     .then((res)=>{
  //     context.commit('successGetComments',res.data)
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // },
  /* 제목관련 게시글 찾기 */
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
  /**이름관련된 게시글 찾기 */
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
        alert('로그인성공')
        context.commit('loginSuccess');
        router.push({name:"Home"});
      }).catch(err=>{
        alert('비밀번호가 다릅니다.')
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
