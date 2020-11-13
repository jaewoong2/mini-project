const mainContainer = document.createElement('div');
const alpahbetArray = [];

const leftBtn = document.querySelector('.ArrowLeft');
const rightBtn = document.querySelector('.ArrowRight');
const bottomBtn = document.querySelector('.ArrowDown');
const enterBtn = document.querySelector('.Enter');
const topBtn = document.querySelector('.ArrowUp');
const controlBtn = document.querySelectorAll('#control-button');

function pFactory(name) {
    const p = document.createElement('p');
    p.innerText = name;
    p.style.color = ['skyblue', 'yellowgreen', 'pink', 'white', 'black'][Math.floor(Math.random() * 5)]
    p.style.position = 'fixed';
    p.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`
    p.style.top = `${Math.floor(Math.random() * window.innerHeight / 6)}px`
    // p.style.border = '1px solid black'
    p.style.fontSize = '99px'

    return p
}
document.body.appendChild(mainContainer)

mainContainer.setAttribute('class', 'main-container');

let xPosition = parseInt(mainContainer.clientWidth / 2, 10);
const makingCharacter = (className, element) => {
    const myCharacter = document.createElement(element);
    let yPosition = parseInt(mainContainer.clientHeight - 200, 10);
    myCharacter.style.top = `${yPosition}px`;
    myCharacter.style.left = `${xPosition}px`;
    
    myCharacter.classList.add(className);

    return myCharacter
}

const myCharacter = makingCharacter('my-character', 'image')

function a(myCharacter, rain) {
    const { top : myCharacterTop, left : myCharacterLeft, width : myCharacterWidth, right : myCharacterRight } = myCharacter.getBoundingClientRect();
    const { top : rainTop, height : rainHeight, left : rainLeft, width : rainWidth, right : rainRight } = rain.getBoundingClientRect();
    const rainBottom = rainTop + rainHeight;
    console.log(window.innerHeight, mainContainer.clientHeight)
    console.log(rain.getBoundingClientRect())
}


function raining(alpha) {
    const { top, height, y } = alpha.getBoundingClientRect();
    // const top = parseInt(alpha.style.top.split('px')[0], 10);
    
    if(top > window.innerHeight) {
        // const newAlpha = pFactory(alpha.innerText);
        // mainContainer.appendChild(newAlpha)
        // raining(newAlpha)
        alpha.style.position = `absolute`
        alpha.style.top = `${window.innerHeight - 100}px`
        return 
    } else {
        alpha.style.top = `${top + 1000}px`
        alpha.style.transform = `rotate(${(Math.random() * 360) + 15}deg)`
        setTimeout(() => {
            raining(alpha)
        },  900);
    }

}

function init(showString) {
    showString.split('').forEach((v, index) => {
        const str = pFactory(v);
        mainContainer.appendChild(str)
        raining(str)
    })
}

init('안녕하세욘')

mainContainer.appendChild(myCharacter);
// 

window.addEventListener('keydown', (e) => {
    if(xPosition > mainContainer.clientWidth - myCharacter.getBoundingClientRect().width ) {
        xPosition -= 22;
    }  
    if(xPosition < 0) {
        xPosition += 22;
    }

    switchKeyBtn(e.key, 'down')
})

window.addEventListener('keyup', (e) => {
    switchKeyBtn(e.key, 'up')
})

let deg = 90;
const switchKeyBtn = (key, isUp) => {
    switch(key) {
        case 'ArrowRight' :
            if(isUp === 'up') {
                rightBtn.classList.remove('pushed');
            } else {
                xPosition += 20;
                myCharacter.style.left = `${xPosition}px`;
                myCharacter.style.transform = `rotate3d(0, 1, 0, ${40}deg)`
                rightBtn.classList.add('pushed');
            }
            break;
        case 'ArrowLeft' :
            if(isUp === 'up') {
                leftBtn.classList.remove('pushed')
            } else {
                xPosition -= 20;
                myCharacter.style.left = `${xPosition}px`;
                myCharacter.style.transform = `rotate3d(0, 1, 0, ${-40}deg)`
                leftBtn.classList.add('pushed')
            }
            break;
        default:  break;
    }
}

