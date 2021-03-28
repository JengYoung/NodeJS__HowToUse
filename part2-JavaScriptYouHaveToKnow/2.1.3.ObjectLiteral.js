var JS = function() {
    console.log('JS');
};

var es = 'ES';
// 과거의 기능 1. : function 을 통한 객체 메서드 함수 연결 방식
// 과거의 기능 2. 속성명, 변수명이 동일해도 반드시 모두 입력
var BeforeES6 = {
    sayObj: function() {
        console.log('Obj was'); 
    },
    JS: JS,
};

// 과거의 기능 3. 속성명 동적 생성 불가.
BeforeES6[es+6] = 'like that'; 

BeforeES6.JS(); // JS
BeforeES6.sayObj(); // Obj was
console.log(BeforeES6.ES6); // Like that

const AfterES6 = {
    // 추가 기능 1. 객체 메서드에 : function 을 생략 가능
    sayObj() {
        console.log('Obj Literal func is');
    },
    // 추가 기능 2. 속성명, 변수명 동일하면 생략 가능
    JS,
    // 추가 기능 3. 동적인 속성명 생성 가능
    [es+6]: 'Like that',
};
console.log("now");
AfterES6.JS(); // JS
AfterES6.sayObj(); // Obj Literal func is
console.log(AfterES6.ES6); // Like that
