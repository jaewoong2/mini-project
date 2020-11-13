"use strict";

var mainContainer = document.createElement('div');
var alpahbetArray = [];
var leftBtn = document.querySelector('.ArrowLeft');
var rightBtn = document.querySelector('.ArrowRight');
var bottomBtn = document.querySelector('.ArrowDown');
var enterBtn = document.querySelector('.Enter');
var topBtn = document.querySelector('.ArrowUp');
var controlBtn = document.querySelectorAll('#control-button');

function pFactory(name) {
  var p = document.createElement('p');
  p.innerText = name;
  p.style.color = ['skyblue', 'yellowgreen', 'pink', 'white', 'black'][Math.floor(Math.random() * 5)];
  p.style.position = 'fixed';
  p.style.left = "".concat(Math.floor(Math.random() * window.innerWidth), "px");
  p.style.top = "".concat(Math.floor(Math.random() * window.innerHeight / 6), "px"); // p.style.border = '1px solid black'

  p.style.fontSize = '99px';
  return p;
}

document.body.appendChild(mainContainer);
mainContainer.setAttribute('class', 'main-container');
var xPosition = parseInt(mainContainer.clientWidth / 2, 10);

var makingCharacter = function makingCharacter(className, element) {
  var myCharacter = document.createElement(element);
  var yPosition = parseInt(mainContainer.clientHeight - 200, 10);
  myCharacter.style.top = "".concat(yPosition, "px");
  myCharacter.style.left = "".concat(xPosition, "px");
  myCharacter.classList.add(className);
  return myCharacter;
};

var myCharacter = makingCharacter('my-character', 'image');

function a(myCharacter, rain) {
  var _myCharacter$getBound = myCharacter.getBoundingClientRect(),
      myCharacterTop = _myCharacter$getBound.top,
      myCharacterLeft = _myCharacter$getBound.left,
      myCharacterWidth = _myCharacter$getBound.width,
      myCharacterRight = _myCharacter$getBound.right;

  var _rain$getBoundingClie = rain.getBoundingClientRect(),
      rainTop = _rain$getBoundingClie.top,
      rainHeight = _rain$getBoundingClie.height,
      rainLeft = _rain$getBoundingClie.left,
      rainWidth = _rain$getBoundingClie.width,
      rainRight = _rain$getBoundingClie.right;

  var rainBottom = rainTop + rainHeight;
  console.log(window.innerHeight, mainContainer.clientHeight);
  console.log(rain.getBoundingClientRect());
}

function raining(alpha) {
  var _alpha$getBoundingCli = alpha.getBoundingClientRect(),
      top = _alpha$getBoundingCli.top,
      height = _alpha$getBoundingCli.height,
      y = _alpha$getBoundingCli.y; // const top = parseInt(alpha.style.top.split('px')[0], 10);


  if (top > window.innerHeight) {
    // const newAlpha = pFactory(alpha.innerText);
    // mainContainer.appendChild(newAlpha)
    // raining(newAlpha)
    alpha.style.position = "absolute";
    alpha.style.top = "".concat(window.innerHeight - 100, "px");
    return;
  } else {
    alpha.style.top = "".concat(top + 1000, "px");
    alpha.style.transform = "rotate(".concat(Math.random() * 360 + 15, "deg)");
    setTimeout(function () {
      raining(alpha);
    }, 900);
  }
}

function init(showString) {
  showString.split('').forEach(function (v, index) {
    var str = pFactory(v);
    mainContainer.appendChild(str);
    raining(str);
  });
}

init('안녕하세욘');
mainContainer.appendChild(myCharacter); // 

window.addEventListener('keydown', function (e) {
  if (xPosition > mainContainer.clientWidth - myCharacter.getBoundingClientRect().width) {
    xPosition -= 22;
  }

  if (xPosition < 0) {
    xPosition += 22;
  }

  switchKeyBtn(e.key, 'down');
});
window.addEventListener('keyup', function (e) {
  switchKeyBtn(e.key, 'up');
});
var deg = 90;

var switchKeyBtn = function switchKeyBtn(key, isUp) {
  switch (key) {
    case 'ArrowRight':
      if (isUp === 'up') {
        rightBtn.classList.remove('pushed');
      } else {
        xPosition += 20;
        myCharacter.style.left = "".concat(xPosition, "px");
        myCharacter.style.transform = "rotate3d(0, 1, 0, ".concat(40, "deg)");
        rightBtn.classList.add('pushed');
      }

      break;

    case 'ArrowLeft':
      if (isUp === 'up') {
        leftBtn.classList.remove('pushed');
      } else {
        xPosition -= 20;
        myCharacter.style.left = "".concat(xPosition, "px");
        myCharacter.style.transform = "rotate3d(0, 1, 0, ".concat(-40, "deg)");
        leftBtn.classList.add('pushed');
      }

      break;

    default:
      break;
  }
};