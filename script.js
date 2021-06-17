/* 
- ошибочными считать незаполненные(пустые) поля, кроме чекбокса (т.к. он может быть как выбран, так и нет)
- поле с эл. почтой не может НЕ содержать знак "@"
- поле с датой не может содержать значение дня больше 10.06.2021 (ниже в трех переменных можно легко менять дату)*/
let y = 2021;
let m = 6;
let d = 10;
/* 
- поле с посетителями не может быть отрицательным (но может быть = 0)  
*/


/// ПЕРЕМЕННЫЕ
let btn = document.querySelector('input[type="submit"]');
let textInputs = document.querySelectorAll('input[type="text"]');
let numberInput = document.querySelector('input[type="number"]');
let textarea = document.querySelector('textarea');
let radioInputs = document.querySelectorAll('input[type="radio"]');
let dateInput = document.querySelector('input[type="date"]');
let select = document.querySelector("select");
let wasClick = false;
let wasClick2 = false;


/// ФУНКЦИИ-ПРОВЕРКИ
function verifyTextInputs(input) {
    let span = input.parentElement.nextElementSibling;
    span.classList.remove("active");

    if (!input.value || input.value == 0 || (input.name == "email" && input.value.indexOf('@') == -1)) {
        span.classList.add("active");
    } 
       
};

function verifyNumberInput(input) {
    let span = input.parentElement.nextElementSibling;
    span.classList.remove("active");

    if (!input.value || input.value < 0) {
        span.classList.add("active");
    }
};

function verifyRadioInputs() {
    let span = radioInputs[0].parentElement.parentElement.nextElementSibling;

    for (let radio of radioInputs) {
        radio.addEventListener("change", function() {
            wasClick = true;   
        });
    };

    if (wasClick) {
        span.classList.remove("active");
    } else {
        span.classList.add("active");
    };
};

function verifyDate(input) {
    let span = input.parentElement.nextElementSibling;
    span.classList.remove("active");

    if (!input.value || input.value == 0 || (input.value.slice(0,4) > y)) {
        span.classList.add("active");
    } else if (input.value.slice(0,4) == y) {
        if (input.value.slice(5,7) > m) {
            span.classList.add("active");
            
        } else if (input.value.slice(5,7) == m) {
            if (input.value.slice(8) > d) {
                span.classList.add("active");
            }
        };
    }; 
};

function verifySelect(input) {
    let span = input.parentElement.nextElementSibling;

    input.addEventListener("change", function() {
        wasClick2 = true;   
    });

    if (wasClick2) {
        span.classList.remove("active");
    } else {
        span.classList.add("active");
    };
    
};


/// ОБРАБОТЧИКИ СОБЫТИЙ
for (let inputText of textInputs) {
    inputText.addEventListener("blur", function() {
        verifyTextInputs(inputText);
    });
};

numberInput.addEventListener("blur", function() {
    verifyNumberInput(numberInput);
});

textarea.addEventListener("blur", function() {
    verifyTextInputs(textarea);
});

dateInput.addEventListener("blur", function() {
    verifyDate(dateInput);
});

select.addEventListener("blur", function(e) {
    verifySelect(select);
});


/// ВАЛИДАЦИЯ ВСЕЙ ФОРМЫ И ЕЕ ОТПРАВКА

btn.addEventListener("click", function(e) {
    e.preventDefault();

    for (let text of textInputs) {
        verifyTextInputs(text);
    };
    verifyNumberInput(numberInput);
    verifyTextInputs(textarea);
    verifyRadioInputs();
    verifyDate(dateInput);
    verifySelect(select);

    let getActiveSpan = document.querySelector("span.active");

    if (getActiveSpan === null) {
        document.forms.validf.submit();
    } else {
        getActiveSpan.previousElementSibling.firstElementChild.focus();
    }
});