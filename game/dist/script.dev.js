"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var makingCharacter = function makingCharacter(className, element) {
  var myCharacter = document.createElement(element);
  myCharacter.classList.add(className);
  return myCharacter;
};

var findAnythingOnMyCharacter = function findAnythingOnMyCharacter(element, highElement) {
  var flag = false;
  var xPosition = "".concat(element.style.left).split('p')[0];
  var yPosition = "".concat(element.style.top).split('p')[0];
  var children = highElement.children;

  for (var i in children) {
    if (_typeof(children[i]) === 'object') {
      var _children$i$getBoundi = children[i].getBoundingClientRect(),
          top = _children$i$getBoundi.top,
          left = _children$i$getBoundi.left,
          width = _children$i$getBoundi.width,
          height = _children$i$getBoundi.height;

      if (left < xPosition && xPosition < left + width) {
        if (top < yPosition && yPosition < top + height) {
          children[i].classList.add('hover');
          flag = true;
        } else {
          children[i].classList.remove('hover');
          flag = false;
        }
      }
    }
  }

  return flag;
};

(function () {
  var startButton = document.querySelector('#start-button');
  var startContainer = document.querySelector('#start-container');
  var mainContainer = document.querySelector('#main-container');

  var clickStartBtn = function clickStartBtn() {
    startContainer.children[0].style.opacity = 0;
    startContainer.children[1].style.opacity = 0;
    setTimeout(function () {
      mainContainer.removeChild(startContainer);
    }, 1000);
  };

  startButton.addEventListener('click', clickStartBtn);
  var myCharacter = makingCharacter('my-character', 'image');
  mainContainer.appendChild(myCharacter);
  console.log(mainContainer.clientWidth * 0.9);
  console.log(mainContainer.clientHeight * 0.8);
  var xPosition = parseInt(startContainer.clientWidth / 2, 10);
  var yPosition = parseInt(startContainer.clientHeight / 2, 10);
  myCharacter.style.top = "".concat(yPosition, "px");
  myCharacter.style.left = "".concat(xPosition, "px");
  window.addEventListener('keydown', function (e) {
    console.log(myCharacter.style.left, xPosition);
    findAnythingOnMyCharacter(myCharacter, startContainer);
    console.log(e.key);

    if (xPosition > mainContainer.clientWidth * 0.9) {
      xPosition -= 10;
    }

    if (yPosition > mainContainer.clientHeight * 0.8) {
      yPosition -= 10;
    }

    switch (e.key) {
      case 'ArrowRight':
        xPosition += 10;
        myCharacter.style.left = "".concat(xPosition, "px");
        break;

      case 'ArrowLeft':
        xPosition -= 10;
        myCharacter.style.left = "".concat(xPosition, "px");
        break;

      case 'ArrowUp':
        yPosition -= 10;
        myCharacter.style.top = "".concat(yPosition, "px");
        break;

      case 'ArrowDown':
        yPosition += 10;
        myCharacter.style.top = "".concat(yPosition, "px");
        break;

      case 'Enter':
        if (findAnythingOnMyCharacter(myCharacter, startContainer)) {
          clickStartBtn();
        }

        break;

      default:
        break;
    }
  });
})();