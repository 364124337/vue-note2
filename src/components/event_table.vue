<template>
    <section class="event-all" :class="{'event-all-show':isShow}">
        <div class="table-box">
            <div class="edit-input" :class="{'edit-input-show': is_edit}">
                <input v-model="info.content" ref="content" type="text">
                <button @click="editData">确定</button>
            </div>
            <div class="screen-box">
                <div class="div-select" :class="{'active':active}">
                    <div class="div-value" @click="active = !active">{{getTypeName}}</div>
                    <div class="div-select-body">
                        <div class="div-option" @click="doSelect(0)">筛选类型</div>
                        <div class="div-option" @click="doSelect(1)">未完成</div>
                        <div class="div-option" @click="doSelect(2)">已完成</div>
                        <div class="div-option" @click="doSelect(3)">已取消</div>
                    </div>
                </div>
            </div>
            <input type="text" v-model="screen_title" class="div-search" placeholder="筛选关键词">
            <div class="event-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>所有事项</th>
                        <th>类型</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value,index) in notepad">
                        <td align="center">{{index + 1}}</td>
                        <td>{{value.content}}</td>
                        <td align="center">{{getType(value.type)}}</td>
                        <td align="center">
                            <button @click="showInput(index)">编辑</button>
                            <button class="del-btn" @click="showDialog(index,value.id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['isShow'],
    data() {
        return {
            active: false,
            screen_type: 0,
            screen_title: '',
            is_edit: false,
            info: {
                content: '',
                id: 0,
                index: 0
            }
        }
    },
    computed: {
        getTypeName() {
            return this.getType(this.screen_type) || "筛选类型";
        },
        notepad() {
            var self = this;
            return self.$store.getters.getEventList.filter(function (d) {
                if (self.screen_type !== 0 && self.screen_title === '') {
                    if (d.type === self.screen_type) {
                        return d;
                    }
                } else if (self.screen_type !== 0 && self.screen_title !== '') {
                    if (d.type === self.screen_type && d.content.indexOf(self.screen_title) !== -1) {
                        return d;
                    }
                } else if (self.screen_type === 0 && self.screen_title !== '') {
                    if (d.content.indexOf(self.screen_title) !== -1) {
                        return d;
                    }
                } else {
                    return d;
                }
            })
        }
    },
    methods: {
        getType(type) {
            let str = '';
            switch (type) {
                case 1:
                    str = '未完成';
                    break;
                case 2:
                    str = '已完成';
                    break;
                case 3:
                    str = '已取消';
                    break;
            }
            return str;
        },
        doSelect(type) {
            this.screen_type = type;
            this.active = false;
        },
        showDialog(index, id) {
            this.$emit('deldialog', index, id);
        },
        showInput(index) {
            this.is_edit = true;
            this.info = {
                index: index,
                content: this.notepad[index].content,
                id: this.notepad[index].id
            }
            this.$refs.content.focus();
        },
        editData(){
            this.info.content = this.info.content.trim();
            if(this.info.content){
                this.$store.dispatch('editevent',this.info);
                this.is_edit = false;
            }
        }
    }
}
</script>

<style lang="stylus">
    .event-all
        position:absolute
        left:0
        top:70px
        right:0
        bottom:0
        transform:translateX(-100%)
        transition:transform .5s 
        overflow-Y:scroll
        background:#fff
        &.event-all-show
            transform: translateX(0)
        .table-box
            width:100%
            max-width:1000px
            margin:20px auto
            .edit-input
                position:fixed
                top:0
                width:100%
                max-width:1000px
                margin:auto
                height:60px
                padding:10px 100px 10px 10px
                box-sizing:border-box
                z-index:10
                transform:translateY(-260px);
                transition:transform .3s
                background:#f3f3f3
                border:1px solid #eee
                border-radius:4px
                &.edit-input-show
                    transform: translateY(0)
                input
                    float:left
                    width:100%
                    height:40px
                    padding:5px 10px
                    box-sizing:border-box
                    border:1px solid #ddd
                button
                    position:absolute
                    right:10px
                    width:80px
                    height:40px
                    color:#fff
                    border:0
            .div-search
                margin-bottom:15px
                width:100%
                height:35px
                ling-height:25px
                padding:5px 10px
                box-sizing:border-box
                border:1px solid #eee
                font-size:12px
                font-family: Arial,'Microsoft YaHei';
                color:#aaa
            .screen-box
                position:relative
                padding:0 0 10px 95px
                height:35px
                .div-select
                    position:absolute
                    left:0 
                    top:0
                    width:85px
                    height:35px
                    padding:0 10px
                    box-sizing:border-box
                    border:1px solid #eee
                    font-size:12px
                    color:#999
                    cursor:pointer
                    &::after
                        position:absolute
                        right:6px
                        top:12px
                        width:6px
                        height:6px
                        content:''
                        border-right:1px solid #999
                        border-bottom:1px solid #999
                        transform:rotate(45deg)
                    &.active
                        .div-select-body
                            height:122px
                            border:1px solid #eee
                            box-shadow:0 0 1px #ddd
                    .div-value
                        line-height:35px
                    .div-select-body
                        position:absolute
                        left:0
                        top:38px
                        width:85px
                        height:0
                        padding-left:10px
                        line-height:30px
                        box-sizing:border-box
                        overflow:hidden
                        z-index:10
                        box-shadow:none
                        border:none
                        border-radius:3px
                        background:#fff
                        transition:all .3s
            .event-table
                width:100%
                padding:0
                border-left:1px solid #eee
                border-top:1px solid #eee
                border-spacing:0
                th
                    font-weight:700
                td,th
                    width:250px
                    position:relative
                    height:40px
                    padding:5px 10px
                    box-sizing:border-box
                    text-overflow: ellipsis
                    vertical-align: middle
                    border-right:1px solid #eee
                    border-bottom:1px solid #eee
                    button
                        padding:3px 7px
                        font-size:12px
                        color:#fff
                        border:0
                        margin:0 3px 3px 0
                        border-radius:5px
                        cursor:pointer
                        &.del-btn
                            background:#f57067 !important
            
</style>
