'use strict';

let body = document.body;
let html = document.documentElement;

let main = document.querySelector('main');

console.log(main.offsetHeight);

window.addEventListener('resize', function() {
    if(window.innerHeight <= (main.offsetHeight+100)) {
        body.style.height = 'auto';
        html.style.height = 'auto';
    } else {
        body.style.height = '100%';
        html.style.height = '100%';
    }
    console.log(main.offsetHeight);
});