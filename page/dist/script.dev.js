"use strict";

var menuBars = document.getElementById('menu-bars');
var overlay = document.getElementById('overlay');
var nav1 = document.getElementById('nav-1');
var nav2 = document.getElementById('nav-2');
var nav3 = document.getElementById('nav-3');
var nav4 = document.getElementById('nav-4');
var nav5 = document.getElementById('nav-5');

function toggleNav() {
  // Toggle menu bars open/closed
  menuBars.classList.toggle('change');
} //  이벤트 리쓰너


nav1.addEventListener('click', toggleNav);
nav2.addEventListener('click', toggleNav);
nav3.addEventListener('click', toggleNav);
nav4.addEventListener('click', toggleNav);
nav5.addEventListener('click', toggleNav);
menuBars.addEventListener('click', toggleNav);