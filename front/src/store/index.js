import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title : '', // 게시글 제목
    writer :'', // 게시글 작성자
    contents : null, // 게시글 내용
    views:0, // 조회수
    findDetail : '', // 조회 조건
    results : [], // 게시글 불러올 데이터 저장할 배열
    isLogin : 'N', // 로그인 여부
    commentsCount:[], // 댓글 수 불러올 데이터 저장할 배열

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

    commentsList:[], // 댓글 리스트 저장할 배열

    editorOptions:{
      useCommandShortcut:false,
             usageStatistics:true,
             useDefaultHTMLSanitizer:false, 
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
    successGetCommentList(state,payload){
      state.commentsCount = payload;
      console.log('댓글수 :',state.commentsCount)
      document.location.href; // 새로고침
    },
    successDetailList(state,payload){
      state.title = payload.title;
      state.writer = payload.writer;
      state.contents = payload.contents;
      state.views = payload.views;
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
    cleanUserInfo(state){
      state.user.email='',
      state.user.password='',
      state.user.passwordConfirm=''
    },
    loginSuccess(state){
      state.isLogin='Y'
      state.nowUserInfo.email = state.user.email
      state.nowUserInfo.password = state.user.password
      state.user.email=''
      state.user.password=''
      state.user.passwordConfirm='';
      // console.log('login user:',state.nowUserInfo);
    },
    logout(state){
      state.nowUserInfo.email='';
      state.nowUserInfo.password='';
      state.isLogin='N';
    },
    successFindDetail(state,payload){
      state.results=payload;
    }
  },
  
  actions: {
    /* 게시판 관련 action */ 
    /* 게시글 불러오기 */
    getList(context){  
    axios.get('http://localhost:3000/board/getList')
      .then((res)=>{
        context.commit('successGetList',res.data);
      }).catch(err=>{
        console.log(err);
      })
      context.commit('allClear')
  },
    /* 댓글 수 불러오기 */
    getCommentList(context){  
      axios.get('http://localhost:3000/board/getCommentList')
      .then((res)=>{
        context.commit('successGetCommentList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },
    /* 게시글 쓰기 */
    listAdd(context,payload){  
      axios.post('http://localhost:3000/board/listAdd',{
        title : this.state.title,
        writer : this.state.nowUserInfo.email,
        contents : payload        
      })
    },
    /* 게시글 상세내용 */
    detailPage(context,payload){  
      console.log('action id :',payload)
      axios.get(`http://localhost:3000/board/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },
    /* 게시글 삭제 */
    deleteList(context,payload){  
      console.log(payload)
      axios.delete(`http://localhost:3000/board/delete?id=${payload}`)
      .then(()=>{
        alert('삭제되었습니다.')
      }).catch(err=>{
        console.log(err);
      })
    },
    /* 게시글 수정하기 위해 상세내용 가져오기 */
    updateProcess(context,payload){ 
      axios.get(`http://localhost:3000/board/detailList?id=${payload}`,{payload})
      .then((res)=>{
        context.commit('successDetailList',res.data)
      }).catch(err=>{
        console.log(err);
      })
    },
    /* 게시글 수정 */
    updateList(context,{getId,con}){ 
      axios.patch(`http://localhost:3000/board/updatePage?id=${getId}`,{
        getId,
        title : this.state.title,
        contents : con
      })
    },
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
    /* 회원가입  */
  SignupProcess(context){
      axios.post('http://localhost:3000/user/signup',{
        email:this.state.user.email,
        // name:this.state.user.name,
        password:this.state.user.password
      }).then(()=>{
        context.commit('cleanUserInfo')
        router.push({name:"Login"})
        alert('회원가입 성공했습니다.')
      }).catch( (err) =>{
        alert(err)
      }) 
    },
    /* 로그인 */
    LoginProcess(context){
      // let selectedUser = null;
      axios.post('http://localhost:3000/user/login',{
        email: this.state.user.email,
        password:this.state.user.password
      }).then(()=>{
        alert('로그인성공')
        context.commit('loginSuccess');
        router.push({name:"Home"});
      }).catch(()=>{
        alert('이메일 혹은 비밀번호가 다릅니다.')
      })
      },
    },

  modules: {
  },
  plugins:[
    createPersistedState({ storage : window.sessionStorage })
  ]
})
