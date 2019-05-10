import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.title = this.navParams.get('title');
    console.log('触发构造函数');
  }
  //返回的方法
  popPage() {
    this.navCtrl.pop();
  }
  //钩子函数  前六个返回值是void()
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  ionViewWillEnter() {
    console.log('触发ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('触发ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('触发ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('触发ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('触发ionViewWillUnload');
  }

//下面两个钩子函数返回值是布尔类型
  //和蔼可亲的班主任
//   ionViewCanEnter() :boolean {
//     if(new Date().getHours()>=8){
//         console.log('怎么的呢，你看看现在几点了，你那么舒服咋不在家里接着睡吶，给我门外站着去！');
//         return false;
//     }
//     return true;
// }

// //杏花楼姿态万千的老鸨
// ionViewCanLeave() :boolean {
//     if(new Date().getHours()>=22){
//         console.log('哎呀公子，你看都这么晚了，最近外面风声那么紧，不如就在我们这儿留宿吧，你看姑娘们都舍不得你回去呢');
//         return false;
//     }
//     return true;
// }
}
