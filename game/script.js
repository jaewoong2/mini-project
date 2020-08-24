const makingCharacter = (className, element) => {
    const myCharacter = document.createElement(element);
    myCharacter.classList.add(className);

    return myCharacter
}

const findAnythingOnMyCharacter = (element, highElement) => {
    let flag = false;
    const xPosition = `${element.style.left}`.split('p')[0];
    const yPosition = `${element.style.top}`.split('p')[0];
    const children = highElement.children
    for(let i in children) {
        if(typeof children[i] === 'object') {
            const { top, left, width, height } = children[i].getBoundingClientRect();
            if(left < xPosition && xPosition < left + width ) {
                if(top < yPosition && yPosition < top + height) {
                    children[i].classList.add('hover')
                    flag = true
                } else {
                    children[i].classList.remove('hover')
                    flag = false;
                }
            }
        }
    }
    


    return flag
}

(() => {
const startButton = document.querySelector('#start-button');
const startContainer = document.querySelector('#start-container');
const mainContainer = document.querySelector('#main-container');

const clickStartBtn = () => {
    startContainer.children[0].style.opacity = 0;
    startContainer.children[1].style.opacity = 0;
    setTimeout(() => {
        mainContainer.removeChild(startContainer)
    }, 1000);
}


startButton.addEventListener('click', clickStartBtn)

const myCharacter = makingCharacter('my-character', 'image')
mainContainer.appendChild(myCharacter)

console.log(mainContainer.clientWidth * 0.9)
console.log(mainContainer.clientHeight * 0.8)

let xPosition = parseInt(startContainer.clientWidth / 2, 10);
let yPosition = parseInt(startContainer.clientHeight / 2, 10);
myCharacter.style.top = `${yPosition}px`;
myCharacter.style.left = `${xPosition}px`;
window.addEventListener('keydown', (e) => {
    console.log(myCharacter.style.left, xPosition)
    findAnythingOnMyCharacter(myCharacter, startContainer)
    console.log(e.key)
    if(xPosition > mainContainer.clientWidth * 0.9) {
        xPosition -= 10;
    }  
    if(yPosition > mainContainer.clientHeight * 0.8) {
        yPosition -= 10;
    }
    switch(e.key) {
        case 'ArrowRight' :
            xPosition += 10;
            myCharacter.style.left = `${xPosition}px`;
            break;
        case 'ArrowLeft' :
            xPosition -= 10;
            myCharacter.style.left = `${xPosition}px`;
            break;
        case 'ArrowUp' :
            yPosition -= 10;
            myCharacter.style.top = `${yPosition}px`;
            break;
        case 'ArrowDown' :
            yPosition += 10;
            myCharacter.style.top = `${yPosition}px`;
            break;
        case 'Enter' : 
            if(findAnythingOnMyCharacter(myCharacter, startContainer)) {
                clickStartBtn();
            }
            break;
        default:  break;
    }
})


})()

