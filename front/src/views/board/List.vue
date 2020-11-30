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
          v-model='findTitle'
          @keyup='findDetailTitle'
      >
     </template>
     <template v-if='this.key==="writer"'>
    <input
      type="text"
      style="height:22px; width:30%" 
      placeholder='Search Writer..' 
      v-model='findWriter'
      @keyup='findDetailWriter'
    >
     </template>
     </div>
     <hr>
<div>

   <b-table 
   @row-clicked="detail" 
   :items='$store.state.results' 
   :fields='fields'
   :per-page='perPage'
   :current-page='currentPage'
   id='boardList'
   >
     <template #cell(글번호)='data'>
       {{data.index+1}}
     </template>
     <template #cell(제목)='data'>
       {{data.item.title}}
       <small v-if="$store.state.commentsCount[data.index]!==0">({{$store.state.commentsCount[data.index]}})</small>
     </template>
     <template #cell(작성자)='data'>
      {{data.item.writer}}      
     </template>
     <template #cell(조회수)='data'>
         {{data.item.views}}
     </template>
   </b-table>   
</div>

   <br>
  <div class='search'>
    <b-button size='sm' @click='write'>글쓰기</b-button>
  </div>

  <div>
    <br>
  <b-pagination 
    align=center
    :total-rows='rows'
    :per-page='perPage'
    v-model='currentPage'
    aria-controls="boardList"
   ></b-pagination>
  </div>
</div>
</template>

<script>

export default {
  data(){
    return{
    key:'title',
    perPage:5,
    currentPage:1,
    fields:['글번호','제목','작성자','조회수'],
    findTitle:'',
    findWriter:'',
    }
  },
beforeCreate(){
  this.$store.dispatch('getList');
  this.items=this.$store.state.results;
},
  created() {  
    this.$store.dispatch('getCommentList')
  },
  computed: {
      rows() {
        return this.items.length
      },
    },

  /*<---------------------------- methods ---------------------------->*/
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
    
    detail(items,idx){
      this.$router.push({ name: 'DetailList', query: {id: this.items[idx]._id }
      })
     },
     findDetailTitle(){
       const find = this.findTitle
       if(find !== ''){
       this.$store.dispatch('FindDetailTitle',find)
       }
       else{
         this.$store.dispatch('getList')
       }
     },
    findDetailWriter(){
       const find = this.findWriter
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