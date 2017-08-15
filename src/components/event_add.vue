<template>
  <div class="event-add">
      <input type="text" v-model="content" name="" id="" class="n-input" @keyup.enter="submit" placeholder="待办事项">
      <button class="add-btn" @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  methods:{
      submit(){
        let params = {
            id:0,
            type:1,
            content:'',
            time:''
        }
        this.content = this.content.trim();
        if(this.content){
            params.content = this.content;
            this.$store.dispatch('addevent',params);
            this.content = '';
        }
      }
  },
  data(){
      return{
          content:''
      }
  }
}
</script>

<style lang="stylus">
    .event-add
        position:relative
        padding:30px 90px 30px 0
        font-size:16px
        .n-input
            width:100%
            height:40px
            padding:7px 10px
            line-height:26px
            border 1px solid #c0ccda
            border-radius:4px
            box-sizing:border-box
            &:focus
                outline:none
        .add-btn
            position:absolute
            right:0
            top:30px
            width:80px
            height:40px
            line-height:26px
            color:#fff

</style>

