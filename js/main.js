// 2.Реализовать функцию curry чтобы выполнялось:
// function abc (a, b, c) {return a + b + c}
// abc.curry('A')('B')('C'); // 'ABC'
// ...

function abc(a, b, c) {
    return a + b + c;
}

let curryMe = function(fn) {
    // сохраняем в замыкании общее колво элементов
    let arity = fn.length
    console.log('arity', arity)

    // в возврате f1 сравниваем ее аргументы с arity
    return function f1(...args) {
        console.log('f1 args', args);
        // если они равны:
        if (args.length >= arity) {
            console.log('enough arguments')
            // возвращаем исходную функцию с этими арг и получ результат
            return fn(...args);
        } else {    // если не равны:
            console.log('need more arguments')
            // возвращаем функцию f2
            // получает аргументы
            return function f2(...moreArgs) {
                console.log('f2', moreArgs)
                // склеивает / конкатит с существующими аргументами
            let newArgs = args.concat(moreArgs)
                // вызывается f1 (рекурсия), до получения достаточного кол-ва аргументов
            return f1(...newArgs)
            }
        }
    }
}

// curryMe(abc)(1,2)(3); // 6 --> works 

abc.curryMeDaddy = function(fn) {
    fn = this;
    // console.log(this)
    let arity = fn.length;

    return function foo(...args) {
        if (args.length >= arity) {
            return fn(...args);
        } else {
            return function boo(...moreArgs) {
                let newArgs = args.concat(moreArgs);
                console.log('input more arguments')
                return foo(...newArgs);
            }
        }
    }
}

abc.curry = abc.curryMeDaddy();
console.log(abc.curry(1,2,3))



// abcdef.curry('A')('B')('C')('D')('E')('F'); // 'ABCDEF'
// abcdef.curry('A', 'B', 'C')('D', 'E', 'F'); // 'ABCDEF'
function abcdef(a,b,c,d,e,f) {
    return a+b+c+d+e+f
}

abcdef.curry = abc.curryMeDaddy.apply(abcdef);
console.log(abcdef.curry(1,2,3,4,5,6));
console.log(abcdef.curry(1,2)(3,4,5,6));
console.log(abcdef.curry(1,2)(3,4)(5,6));



