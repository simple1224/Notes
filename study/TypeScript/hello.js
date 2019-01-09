var Person = /** @class */ (function () {
    function Person(hobby) {
        this.hobby = hobby;
    }
    Person.prototype.echo = function () {
        return '我就喜欢：' + this.hobby;
    };
    return Person;
}());
var person = new Person('抽烟，喝酒，烫头');
var hobby = person.echo();
console.log(hobby);
