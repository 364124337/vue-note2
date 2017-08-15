<template>
  <div class="event-content">
      <div class="event-tab">
          未完成
          <span></span>
      </div>
      <div class="event-box">
          <ul>
              <li class="event-list" v-for="value in getToDo">
                  <input type="checkbox" :key="value.id" @click="moveToDone(value.id)">
                  <div>{{value.content}}</div>
                  <button class="cancel-btn" @click="moveCancel(value.id)">取消</button>
              </li>
          </ul>
      </div>

      <div class="event-tab">
          已完成
          <span></span>
      </div>
      <div class="event-box">
          <ul>
              <li class="event-list" v-for="value in getDone">
                  <input type="checkbox"  @click="moveToDo(value.id)" checked :key="value.id" name="" id="">
                  <div>{{value.content}}</div>
                  <span class="event-time">2017-6-15</span>
              </li>
          </ul>
      </div>

      <div class="event-tab">
          已取消
          <span></span>
      </div>
      <div class="event-box">
          <ul>
              <li class="event-list" v-for="value in getCancel">
                  <div>{{value.content}}</div>
                  <button class="cancel-btn" @click="moveToDo(value.id)">恢复</button>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  computed:{
      getToDo(){
          return this.$store.getters.getToDo;
      },
      getDone(){
          return this.$store.getters.getDone;
      },
      getCancel(){
          return this.$store.getters.getCancel;
      },
  },
  methods:{
      moveToDone(id){//移至已完成
            this.$store.dispatch('eventdone',id);
      },
      moveCancel(id){//移至已取消
          this.$store.dispatch('eventcancel',id);
      },
      moveToDo(id){//移至没完成
            this.$store.dispatch('eventtodo',id);
      }
  }
}
</script>


<style lang="stylus">
    .event-content
        .event-tab
            background-color:blue 
            position:relative
            height:44px
            line-height:44px
            padding-left:20px
            border-bottom :1px solid #fff
            color:#fff
            cursor:pointer
            span
                position:absolute
                right:20px
                top:15px
                width:10px
                height:10px
                border-top:2px solid #fff
                border-right:2px solid #fff
                transform:rotate(135deg)
        .event-box
            list-style:none
            border-left:1px solid #eee
            border-right:1px solid #eee
            .event-list
                position:relative
                min-height:44px
                line-height:25px
                padding:10px 100px 10px 50px
                box-sizing:border-box
                border-bottom :1px solid #eee
                color:#373e40
                input[type=checkbox]
                    position:absolute
                    left:15px
                    top:12px
                    width:20px
                    height:20px
                .cancel-btn
                    position:absolute
                    right:10px
                    top:7px
                    width:50px
                    height:30px
                    line-height:30px
                    padding:0
                    background:#fff
                    border:1px solid #c0ccda
                    color:#666
                    font-size:12px
                .event-time
                    position:absolute
                    right:10px
                    top:0
                    line-height:44px
                    font-size:12px
                    color:#aaa

</style>
