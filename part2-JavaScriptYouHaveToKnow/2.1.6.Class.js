// var Dog = function(type) {
//     this.type = type || 'dog'
// };

// Dog.isDog = function(dog) {
//     return dog instanceof Dog;
// }

// Dog.prototype.say = function() {
//     console.log('bark!');
// };

// var shibe = function(type, name) {
//     Dog.apply(this, arguments);
//     this.name = name;
// }

// shibe.prototype = Object.create(Dog.prototype);
// shibe.prototype.constructor = shibe;
// shibe.prototype.sayName = function() {
//     shibe.prototype.say()
//     console.log(this.name);
// }
// var newDog = new shibe('dog', 'siva');

// console.log(newDog.sayName());


class Dog {
    constructor(type = 'dog') {
        this.type = type;
    };

    static isDog(dog) {
        return dog instanceof Dog;
    };

    say() {
        console.log('bark!');
    };
}

class shibe extends Dog {
    constructor(type, name) {
        super(type);
        this.name = name;
    };
    
    sayName() {
        super.say();
        console.log(this.name);
    };
};

const newDog = new shibe('dog', 'siva');
console.log(Dog.isDog(newDog));
console.log(newDog.sayName());