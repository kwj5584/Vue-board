<template>
 <div>
   <div class="search">
     <select name="searchType" style='height:22px' @change='onChange($event)' v-model='key'>
       <option value="title">Title</option>
       <option value="writer">Writer</option>
     </select>
     <template v-if='this.key==="title"'>
      <input
          type="text"
          style="height:22px; width:30%;"  
          placeholder='Search Title..' 
          v-model='$store.state.findDetail'
          @keyup='findDetailTitle'
      >
     </template>
     <template v-if='this.key==="writer"'>
    <input
      type="text"
      style="height:22px; width:30%" 
      placeholder='Search Writer..' 
      v-model='$store.state.findDetail'
      @keyup='findDetailWriter'
    >
     </template>
     </div>
     <hr>
   <!-- <h1 style='text-align:center'>toast-ui editor</h1> -->
   <table class='board'>
     <thead>
       <tr class='tr'>
         <th class='td'>글번호</th>
         <th class='td'>제목</th>
         <th class='td'>작성자</th>
         <th class='td'>조회수</th>
       </tr>
     </thead>
     <tbody @click='detail(result)' v-for='(result,idx) in $store.state.results' :key="result.idx">
       <tr class='tr'>
         <td class='td' width="10%">{{idx+1}}</td>
         <td class='td' width="50%">{{result.title}}
           <small v-if="$store.state.commentsCount">({{$store.state.commentsCount[idx]}})</small>
         </td>
         <td class='td' width="30%">{{result.writer}}</td>
         <td class='td' wdith='10%'>{{result.views}}</td>
       </tr>
     </tbody>
   </table>
   <br>
  <div class='search'>
    <b-button size='sm' @click='write'>글쓰기</b-button>
  </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
    key:'title'
    }
  },
  created() {
    this.$store.dispatch('getList');
    this.$store.dispatch('getCommentList');
  },
  components:{
  },
  methods:{
    onChange(event){
      this.key=event.target.value
    },
    write(){
      if(this.$store.state.isLogin==='N'){
        alert('로그인 먼저 하세요');
        this.$router.push({name:'Login'})
      }
      else{
      this.$router.push({name:'ListAdd'})
      }
    },
    
    detail(result){
      console.log('clicked id is', result._id)
      this.$router.push({ name: 'DetailList', query: {id: result._id }
      })
     },
     findDetailTitle(){
       const find = this.$store.state.findDetail
       if(find !== ''){
       this.$store.dispatch('FindDetailTitle',find)
       }
       else{
         this.$store.dispatch('getList')
       }
     },
    findDetailWriter(){
       const find = this.$store.state.findDetail
       if(find !== ''){
       this.$store.dispatch('FindDetailWriter',find)
       }
       else{
         this.$store.dispatch('getList')
       }
     },

  }
}
</script>

<style>
.board{
  margin:auto;
  justify-content: center;
  max-width:1000px;
}
.tr{
  border:1px solid black;
  text-align:center;
}
.td{ 
  border: 1px solid black;
  text-overflow:clip;
}

.search{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>