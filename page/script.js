// const menuBars = document.getElementById('menu-bars');
// const overlay = document.getElementById('overlay');
// const nav1 = document.getElementById('nav-1');
// const nav2 = document.getElementById('nav-2');
// const nav3 = document.getElementById('nav-3');
// const nav4 = document.getElementById('nav-4');
// const nav5 = document.getElementById('nav-5');


// function toggleNav() {
//     // Toggle menu bars open/closed
//     menuBars.classList.toggle('change');

//     overlay.classList.toggle('overlay-active');
//     if(overlay.classList.contains('overlay-active')) {
//         overlay.classList.add('overlay-slice-right')
//     } else {
//         overlay.classList.add('overlay-slice-left')
//     }
// }


// //  이벤트 리쓰너
// nav1.addEventListener('click', toggleNav)
// nav2.addEventListener('click', toggleNav)
// nav3.addEventListener('click', toggleNav)
// nav4.addEventListener('click', toggleNav)
// nav5.addEventListener('click', toggleNav)
// menuBars.addEventListener('click', toggleNav);



const p = document.createElement('p');
async function tenTotwo(number) {
    let string = '';
    while(number === 0 || number === 1) {
        string = string + (number % 2);
        number = number / 2;
    }
    return string;
}
let stringValue = await tenTotwo(61125);

p.innerHTML = stringValue;

const main = document.querySelector('#main');
main.appendChild(p);