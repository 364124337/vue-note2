<template>
  <div id="app" :class="[getTheme]">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide':table}">
      <n-add></n-add>
      <n-list></n-list>
      <n-sidebar :is-show="tools" @opentheme="theme = true;tools = false" @uploadData="uploadData" @cleardialog='clearData' @opentable='table = true;tools = false'></n-sidebar>
    </section>
    <n-dialog v-show="dialog" :msg="tips" @cancel="dialog=false" @sure="sureDialog"></n-dialog>
    <n-table @deldialog="delData" :is-show="table"></n-table>
    <n-theme :is-show="theme"></n-theme>
  </div>
</template>

<script>
import nHeader from './components/header';
import nSidebar from './components/sidebar';
import nAdd from './components/event_add';
import nList from './components/event_list';
import nTheme from './components/theme';
import nDialog from './components/dialog.vue';
import nTable from './components/event_table.vue';

export default {
  components: {
    nHeader,
    nSidebar,
    nAdd,
    nList,
    nTheme,
    nDialog,
    nTable,
  },
  methods: {
    changePages() {
      if (this.table) {
        this.table = !this.table;
      } else if (this.theme) {
        this.theme = !this.theme;
      } else {
        this.tools = !this.tools;
      }
    },
    uploadData() {
      this.tools = false;
      this.dialog = true;
      this.dialog_type = 'upload';
      this.tips = 'upload';
    },
    clearData() {
      this.tools = false;
      this.dialog = true;
      this.dialog_type = 'clear';
      this.tips = '清空后无法恢复，确认清空吗？';
    },
    sureDialog() {
      switch (this.dialog_type) {
        case 'clear':
          this.$store.dispatch('clearevent');
          break;
        case 'del':
          this.$store.dispatch('delevent',this.del_info);
          break;
      }
      this.dialog = false;
    },
    delData(index, id) {
      this.dialog = true;
      this.dialog_type = 'del';
      this.tips = '删除后无法恢复,确认删除吗？';
      this.del_info = {
        index: index,
        id: id
      }
    }
  },
  data() {
    return {
      tools: false,
      theme: false,
      dialog: false,
      tips: '',
      dialog_type: '',
      table: false,
      del_info: {
        index: 0,
        id: 0
      }
    }
  },
  computed: {
    getTheme() {             // 获取主题色
      return this.$store.getters.getTheme;
    }
  }
}
</script>
<style lang="stylus" src="../static/theme.styl"></style>
<style lang="stylus">
  .container
    width:100%
    padding:0 10px
    max-width:800px
    margin:auto
    &.hide
      display:none

</style>
