<template>
 <div>
   <h1 style='text-align:center'>toast-ui editor</h1>
   <table class='table'>
     <thead>
       <tr >
         <th>글번호</th>
         <th>제목</th>
         <th>작성자</th>
       </tr>
     </thead>
     <tbody @click='detail(result)' v-for='(result,idx) in $store.state.results' :key="result.idx">
       <tr>
         <td width="10%">{{idx+1}}</td>
         <td width="60%">{{result.title}}</td>
         <td width="30%">{{result.writer}}</td>
       </tr>
     </tbody>
   </table>
 
  <div>
    <br>
    <button @click='write'>글쓰기</button>
  </div>
  </div>
</template>

<script>

export default {
  
  created() {
    this.$store.dispatch('getList');
  },
  components:{
  },
  methods:{
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
     }
  }
}
</script>

<style>
table{
  margin:auto;
  justify-content: center;
  max-width:1000px;
}
tr{
  border:1px solid black;
  text-align:center;
}
td{ 
  border: 1px solid black;
  text-overflow:clip;
}
button{
  margin:auto;
}
</style>