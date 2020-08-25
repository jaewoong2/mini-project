"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var makingCharacter = function makingCharacter(className, element) {
  var myCharacter = document.createElement(element);
  myCharacter.classList.add(className);
  return myCharacter;
};

var findAnythingOnMyCharacter = function findAnythingOnMyCharacter(element, highElement) {
  var flag = false;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      left = _element$getBoundingC.left,
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height;

  var bottom = top + height;
  var right = left + width;
  var children = highElement.children;

  for (var i in children) {
    if (_typeof(children[i]) === 'object') {
      if (children[i].classList[0] === 'start-container') {
        children = children[i].children;
      }
    }
  }

  for (var _i in children) {
    if (_typeof(children[_i]) === 'object') {
      if (children[_i] && children[_i] !== element) {
        var _children$_i$getBound = children[_i].getBoundingClientRect(),
            staticTop = _children$_i$getBound.top,
            staticLeft = _children$_i$getBound.left,
            staticWidth = _children$_i$getBound.width,
            staticHeight = _children$_i$getBound.height;

        var staticBottom = staticTop + staticHeight;
        var staticRight = staticLeft + staticWidth;
        var topLeftBoolean = bottom > staticTop && right > staticLeft ? true : false;
        var bottomLeftBoolean = top < staticBottom && right > staticLeft ? true : false;
        var topRightBoolean = bottom > staticTop && left < staticRight ? true : false;
        var bottomRightBoolean = top < staticBottom && left < staticRight ? true : false;

        if ((topLeftBoolean && bottomLeftBoolean || bottomRightBoolean && topRightBoolean) && (topLeftBoolean && topRightBoolean || bottomLeftBoolean && bottomRightBoolean)) {
          children[_i].classList.add('hover');

          flag = true;
        } else {
          children[_i].classList.remove('hover');

          flag = false;
        }
      }
    }
  }

  return flag;
};

function mainGameFunction(mainContainer) {
  var npcOne = makingCharacter('my-character', 'image');
  mainContainer.appendChild(npcOne);
  npcOne.style.top = '10vh';
  var npcTwo = makingCharacter('my-character', 'image');
  mainContainer.appendChild(npcTwo);
  npcTwo.style.bottom = '10vh';
  var npcThree = makingCharacter('my-character', 'image');
  mainContainer.appendChild(npcThree);
  npcThree.style.left = '5vh';
  window.addEventListener('resize', function () {
    npcOne.style.top = '10vh';
    npcTwo.style.bottom = '10vh';
    npcThree.style.left = '5vh';
  });
}

(function () {
  var startButton = document.querySelector('#start-button');
  var startContainer = document.querySelector('#start-container');
  var mainContainer = document.querySelector('#main-container');
  var mainGame = document.querySelector('#main-game');
  var leftBtn = document.querySelector('.ArrowLeft');
  var rightBtn = document.querySelector('.ArrowRight');
  var bottomBtn = document.querySelector('.ArrowDown');
  var enterBtn = document.querySelector('.Enter');
  var topBtn = document.querySelector('.ArrowUp');
  var controlBtn = document.querySelectorAll('#control-button');
  var flag = false;
  var xPosition = parseInt(mainContainer.clientWidth / 2, 10);
  var yPosition = parseInt(mainContainer.clientHeight / 2, 10);

  var clickStartBtn = function clickStartBtn() {
    startContainer.children[0].style.opacity = 0;
    startContainer.children[1].style.opacity = 0;
    setTimeout(function () {
      mainContainer.removeChild(startContainer);
      mainGame.classList.remove('hidden');
      mainGameFunction(mainContainer);
    }, 1000);
    mainContainer.appendChild(mainGame);
  };

  startButton.addEventListener('click', clickStartBtn);
  var myCharacter = makingCharacter('my-character', 'image');
  myCharacter.style.top = "".concat(yPosition, "px");
  myCharacter.style.left = "".concat(xPosition, "px");
  mainContainer.appendChild(myCharacter);
  window.addEventListener('keydown', function (e) {
    flag = findAnythingOnMyCharacter(myCharacter, mainContainer);

    if (xPosition > mainContainer.clientWidth * 0.9) {
      xPosition -= 12;
    }

    if (yPosition > mainContainer.clientHeight * 0.8) {
      yPosition -= 12;
    }

    if (xPosition < mainContainer.clientWidth * 0.05) {
      xPosition += 12;
    }

    if (yPosition < mainContainer.clientHeight * 0.1) {
      yPosition += 12;
    }

    switchKeyBtn(e.key, 'down');
  });
  window.addEventListener('resize', function () {
    myCharacter.style.top = "".concat(yPosition, "px");
    myCharacter.style.left = "".concat(xPosition, "px");
  });
  window.addEventListener('keyup', function (e) {
    switchKeyBtn(e.key, 'up');
  });
  controlBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var key = e.currentTarget.classList[0];
      switchKeyBtn(key, 'down');
      flag = findAnythingOnMyCharacter(myCharacter, mainContainer);
      setTimeout(function () {
        switchKeyBtn(key, 'up');
      }, 100);
    });
  });

  var switchKeyBtn = function switchKeyBtn(key, isUp) {
    switch (key) {
      case 'ArrowRight':
        if (isUp === 'up') {
          rightBtn.classList.remove('pushed');
        } else {
          xPosition += 10;
          myCharacter.style.left = "".concat(xPosition, "px");
          rightBtn.classList.add('pushed');
        }

        break;

      case 'ArrowLeft':
        if (isUp === 'up') {
          leftBtn.classList.remove('pushed');
        } else {
          xPosition -= 10;
          myCharacter.style.left = "".concat(xPosition, "px");
          leftBtn.classList.add('pushed');
        }

        break;

      case 'ArrowUp':
        if (isUp === 'up') {
          topBtn.classList.remove('pushed');
        } else {
          yPosition -= 10;
          myCharacter.style.top = "".concat(yPosition, "px");
          topBtn.classList.add('pushed');
        }

        break;

      case 'ArrowDown':
        if (isUp === 'up') {
          bottomBtn.classList.remove('pushed');
        } else {
          yPosition += 10;
          myCharacter.style.top = "".concat(yPosition, "px");
          bottomBtn.classList.add('pushed');
        }

        break;

      case 'Enter':
        if (isUp === 'up') {
          enterBtn.classList.remove('pushed');
        } else {
          enterBtn.classList.add('pushed');
        }

        if (flag) {
          clickStartBtn();
        }

        break;

      default:
        break;
    }
  };
})();