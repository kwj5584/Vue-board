<template>
  <div>
    props is {{$props.id}}
    <br>
<input type="text" placeholder="ID" v-model='$store.state.comments.commentsId'>
<input type="password" placeholder="Password" v-model="$store.state.comments.commentsPassword">
<br>
<textarea v-model='$store.state.comments.commentsContents' placeholder="내용 입력" cols="48" rows="5"></textarea>
<button @click ='register'>등록</button>
  <div>
    <table>
      <tbody style="border: 1px solid black">
        <tr style="border: 1px solid black">
          <td style="border: 1px solid black">testasdfas</td>
          <td style="border: 1px solid black ">123123</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  
</template>

<script>
export default {
  created(){
    console.log(this.$props.id);
    this.$store.dispatch('getComments')
  },
  props:['id'],
  methods:{
    register(){
      this.$store.dispatch('commentsRegister');
    }
  }
}
</script>

<style>

</style>