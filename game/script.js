const makingCharacter = (className, element) => {
    const myCharacter = document.createElement(element);
    
    myCharacter.classList.add(className);


    return myCharacter
}

const findAnythingOnMyCharacter = (element, highElement) => {
    let flag = false;
    const { top, left, width, height } = element.getBoundingClientRect();
    const bottom = top + height;
    const right = left + width;
    
    let children = highElement.children;

    for(let i in children) {
        if(typeof children[i] === 'object') {
            if(children[i].classList[0] === 'start-container') {
            children = children[i].children
        } 
    }
}
    

    for(let i in children) {
        if(typeof children[i] === 'object') {

            if(children[i] && (children[i] !== element)) {
                const { top : staticTop, left : staticLeft, 
                    width : staticWidth, height : staticHeight } = children[i].getBoundingClientRect();
                    const staticBottom = staticTop + staticHeight;
                const staticRight = staticLeft + staticWidth;                
                const topLeftBoolean = (bottom > staticTop && right > staticLeft) ? true : false;
                const bottomLeftBoolean = (top < staticBottom && right > staticLeft) ? true : false;
                const topRightBoolean = (bottom > staticTop && left < staticRight) ? true : false;
                const bottomRightBoolean = (top < staticBottom && left < staticRight) ? true : false;
                
                if(((topLeftBoolean && bottomLeftBoolean) || (bottomRightBoolean && topRightBoolean)) &&
                ((topLeftBoolean && topRightBoolean) || (bottomLeftBoolean && bottomRightBoolean))
                ) {
                    children[i].classList.add('hover')
                    flag = true;
                } else {
                    children[i].classList.remove('hover')
                    flag = false;
                }
            }
        } 
    }
    return flag
}
                
                
            

function mainGameFunction(mainContainer) {
    const npcOne = makingCharacter('my-character', 'image');
    mainContainer.appendChild(npcOne)
    npcOne.style.top = '10vh';
    const npcTwo = makingCharacter('my-character', 'image');
    mainContainer.appendChild(npcTwo)
    npcTwo.style.bottom = '10vh';
    const npcThree = makingCharacter('my-character', 'image');
    mainContainer.appendChild(npcThree)
    npcThree.style.left = '5vh';
    
    window.addEventListener('resize', () => {
        npcOne.style.top = '10vh';
        npcTwo.style.bottom = '10vh'
        npcThree.style.left = '5vh';
    })
}


(() => {
const startButton = document.querySelector('#start-button');
const startContainer = document.querySelector('#start-container');
const mainContainer = document.querySelector('#main-container');
const mainGame = document.querySelector('#main-game');
const leftBtn = document.querySelector('.ArrowLeft');
const rightBtn = document.querySelector('.ArrowRight');
const bottomBtn = document.querySelector('.ArrowDown');
const enterBtn = document.querySelector('.Enter');
const topBtn = document.querySelector('.ArrowUp');
const controlBtn = document.querySelectorAll('#control-button');

let flag = false;
let xPosition = parseInt(mainContainer.clientWidth / 2, 10);
let yPosition = parseInt(mainContainer.clientHeight / 2, 10);

const clickStartBtn = () => {
    startContainer.children[0].style.opacity = 0;
    startContainer.children[1].style.opacity = 0;
    setTimeout(() => {
        mainContainer.removeChild(startContainer)
        mainGame.classList.remove('hidden');
        mainGameFunction(mainContainer);
    }, 1000);
    mainContainer.appendChild(mainGame);
}

startButton.addEventListener('click', clickStartBtn);
const myCharacter = makingCharacter('my-character', 'image')

myCharacter.style.top = `${yPosition}px`;
myCharacter.style.left = `${xPosition}px`;
mainContainer.appendChild(myCharacter);

window.addEventListener('keydown', (e) => {
    flag = findAnythingOnMyCharacter(myCharacter, mainContainer)

    if(xPosition > mainContainer.clientWidth * 0.9) {
        xPosition -= 12;
    }  
    if(yPosition > mainContainer.clientHeight * 0.8) {
        yPosition -= 12;
    }
    if(xPosition < mainContainer.clientWidth * 0.05) {
        xPosition += 12;
    }
    if(yPosition < mainContainer.clientHeight * 0.1) {
        yPosition += 12;
    }

    switchKeyBtn(e.key, 'down')
})

window.addEventListener('resize', () => {
    myCharacter.style.top = `${yPosition}px`;
    myCharacter.style.left = `${xPosition}px`;

})

window.addEventListener('keyup', (e) => {
    switchKeyBtn(e.key, 'up')
})

controlBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const key = e.currentTarget.classList[0]
        switchKeyBtn(key, 'down')
        flag = findAnythingOnMyCharacter(myCharacter, mainContainer)
        setTimeout(() => {
        switchKeyBtn(key, 'up')
        }, 100);
    })
})

const switchKeyBtn = (key, isUp) => {
    switch(key) {
        case 'ArrowRight' :
            if(isUp === 'up') {
                rightBtn.classList.remove('pushed');
            } else {
                xPosition += 10;
                myCharacter.style.left = `${xPosition}px`;
                rightBtn.classList.add('pushed');
            }
            break;
        case 'ArrowLeft' :
            if(isUp === 'up') {
                leftBtn.classList.remove('pushed')
            } else {
                xPosition -= 10;
                myCharacter.style.left = `${xPosition}px`;
                leftBtn.classList.add('pushed')
            }
            break;
        case 'ArrowUp' :
            if(isUp === 'up') {
                topBtn.classList.remove('pushed')
            } else {
                yPosition -= 10;
                myCharacter.style.top = `${yPosition}px`;
                topBtn.classList.add('pushed')
            }
            break;
        case 'ArrowDown' :
            if(isUp === 'up') {
                bottomBtn.classList.remove('pushed')
            } else {
                yPosition += 10;
                myCharacter.style.top = `${yPosition}px`;
                bottomBtn.classList.add('pushed')
            }
            break;
        case 'Enter' : 
        if(isUp === 'up') {
            enterBtn.classList.remove('pushed')
        } else {
            enterBtn.classList.add('pushed')
        }
        if(flag) {
            clickStartBtn();
        }
            break;
        default:  break;
    }
}

})()

