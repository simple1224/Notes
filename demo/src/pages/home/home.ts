import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// 方式一：1.引入TestPage组件
import { TestPage } from '../test/test'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //2.在HomePage中定义testPage属性
  testPage;
  //类的构造函数定义了一个NavController类型的参数，
  // 以告诉angular在创建页面时，需要传入（注入）一个NavController的实例.
  constructor(public navCtrl: NavController) {
    //3.在构造函数中将testPage纸箱TestPage
    this.testPage = TestPage;
  }

  //方式二：利用navcontroller 的push
  // 1.在类中编写一个方法，我们就叫它pushTestPage吧，
  // 调用navCtrl对象的push方法，将页面导航到TestPage上
  // pushTestPage(){
  //   this.navCtrl.push(TestPage);
  // }

  //为push函数添加第二个参数
  //假设我们要为TestPage传入一个标题，用来显示到页面上，我们为push方法传入一个对象
  //引入NavParam并使用
  //利用NavParams的get方法，可以将传进来的页面参数读取出来。
  // 切换到 test.ts，完成三个步骤
  // 1.引入NavParams并，并在构造函数添加注入语句
  // 2.为TestPage类添加title属性，读取参数并赋给title
  // 3.将title输出到模板中
  pushTestPage() {
    this.navCtrl.push(TestPage, {
      title: '没有人可以比我帅'
    });
  }
}
