function add(a, b) {
    console.log(a + b);
} 
const arrowFuncAdd = (a,b) => console.log(a + b) // = {return a + b

add(1,2);
arrowFuncAdd(1,2);


///////////////////////////////////////////////////////////////
var window = window
var notArrowFunc = {
    name: 'jengyoung',
    tags: ['front', 'end', 'dev'],
    say: function() {
        // 일단 바깥 스코프를 가리키는 this를 저장해야 함.
        // 왜냐하면, 새로운 함수를 입력하는 순간, 안에서 또 this가 생기기 때문.
        var that = this;
        // console.log("outer this: ", this);
        this.tags.forEach(function (tag) {
            // console.log("inner this: ", this);
            const d = function() {
                return this;
            }
            console.log(d() === global)
        });
    }
};
notArrowFunc.say();

console.log("")
const ArrowFunc = {
    name: 'jengyoung',
    tags: ['front', 'end', 'dev'],
    say() {
        // console.log("outer this: ", this);
        this.tags.forEach((tag) => {
            // console.log("inner this: ", this);
            // 바깥 스코프의 this를 그대로 사용 가능.
            // 왜냐하면, 상위 스코프의 this를 물려받기 때문.
            console.log(this.name, tag);
        });
    }
};
ArrowFunc.say();



console.clear()

function f() {
    return this.a;
  }
  
  var g = f.bind({a: 'azerty'});
  console.log(g()); // azerty
  
  var h = g.bind({a: 'yoo'}); // bind는 한 번만 동작함!
  console.log(h()); // azerty
  
  var o = {a: 37, f, g, h};
  console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty