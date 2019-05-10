<template>
<div class="container" >
  <div class="add-task">
    <!--<input v-model="inputValue">-->
    <h1>to do my list!</h1>
    <input v-model="inputValue" name="content" type="text"  placeholder="e.g.今天记得学习"
             autofocus="autofocus" autocomplete="off">
    <button @click="handleSubmit" type="submit">提交</button>
  </div>

    <todo-item v-for = "(item,index) of list" :key="index"  :content="item" :index="index" @delete-item="handleDelete">
    </todo-item>
</div>
</template>

<script>
import TodoItem from './components/TodoItem'
export default {
    components :{
        'todo-item': TodoItem
    },
    //使用脚手架时 data由一个对象变成一个函数
    //以下写法相当于 data : function()
    data (){
        return{
            inputValue : '',
            list:[]
        }
    },
    methods :{
        handleSubmit (){
           this.list.push(this.inputValue)
            //this的指向是当前的实例
            this.inputValue = ''
        },
        handleDelete (index){
            this.list.splice(index,1)
        }
    }
}
</script>

<style>
    *{
        /*background: rgba(0,0,0,.1);*/
        box-sizing: border-box;
        /*transition是什么作用*/
        transition: background-color .2s;
        outline: 0;
    }
    body{
        background-color: lightpink;
    }
    .container{
        max-width: 700px;
        margin: 0 auto;/*设置居中*/
        position: relative;/*为父元素添加relative，子元素设置absolute*/
        padding: 0 10px ;
    }
    h1{
        text-align: center;
    }
    .add-task input[type=text]{
        float: left;
        width: 84%;
        margin-right: 1%;
    }
    .add-task [type=submit]{
        width: 15%;
        -webkit-box-shadow: 0 2px 3px rgba(0,0,0,.4);
    }
    .add-task [type=submit]:hover{
        background: #b7a0ae;
    }
    input,button{
        border-radius: 3px;
        padding: 10px;
        border: 0;
    }
</style>
