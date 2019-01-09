class Person {
    hobby: string;
    constructor(hobby: string) {
        this.hobby = hobby;
    }
    echo() {
        return '我就喜欢：' + this.hobby;
    }
}
let person = new Person('抽烟，喝酒，烫头');
let hobby = person.echo();
console.log(hobby);
