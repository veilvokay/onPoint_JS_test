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
console.log(abcdef.curry('a','v')('c','s','a','q'));
console.log(abcdef.curry(1,2)(3,4)(5,6));



// 3.Что можно улучшить? Как бы вы переписали функцию drawRating при условии что на вход функции drawRating должна приходить переменная vote, содержащая значение от 0 до 100. Интересует именно логика реализации функции, не визуальное отображение звезд.

function drawRating(vote) {
    if (vote >= 0 && vote <= 20) {
        return '★☆☆☆☆';
    }
    else if (vote > 20 && vote <= 40) {
        return '★★☆☆☆';
    }
    else if (vote > 40 && vote <= 60) {
        return '★★★☆☆';
    }
    else if (vote > 60 && vote <= 80) {
        return '★★★★☆';
    }
    else if (vote > 80 && vote <= 100) {
        return '★★★★★';
    }
}



function newDrawRate(vote) {
    let stars = (vote != 0) ? Math.ceil(vote/20) : 1
    return Array(stars + 1).join("★") + Array(6-stars).join("☆");
}