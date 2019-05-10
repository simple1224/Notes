<template>
    <!--<li class="item" @click ="handleDelete">{{content}}</li>-->
    <div class="task-list">
        <div class="task-item">
            <span><input class="complete" type="checkbox"></span>
            <span class="task-content" @click ="handleDelete">{{content}}</span>
            <span class="fr">
            <span class="action delete"> 删除</span>
            <span class="action detail"> 详细</span>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    props:['content','index'],
    methods: {
        handleDelete(){
            //$emit触发当前实例上的事件。附加参数都会传给监听器回调。
            this.$emit('delete-item',this.index)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*<!--scoped为样式添加了一个域  这里的样式只适应于本组件-->*/
    .task-list{
        margin: 10px 0;
    }
    .task-item{
        padding: 10px;
        background-color: #fff;
        margin-bottom: 2px;
        /*设置阴影*/
        -webkit-box-shadow: 0 2px 3px rgba(0,0,0,.4);
        /*设置一个小手出来  表示这里可以点击*/
        cursor:pointer;
        border-radius: 3px;
        border: 0;
    }
    .task-item:hover{
        background: #eee;
    }
    .fr{
        float: right;
    }

</style>
