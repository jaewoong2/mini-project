"use strict";

var toggleSwitchs = document.querySelector('input[type="checkbox"]');
var nav = document.getElementById('nav');
var toggleIcon = document.querySelector('#toggle-icon');
var imageOne = document.getElementById('image1');
var imageTwo = document.getElementById('image2');
var imageThree = document.getElementById('image3');
var textBox = document.getElementById('text-box'); // Dark or Light Images

var imageMode = function imageMode(color) {
  imageOne.src = "img/undraw_proud_coder_".concat(color, ".svg");
  imageTwo.src = "img/undraw_feeling_proud_".concat(color, ".svg");
  imageThree.src = "img/undraw_conceptual_idea_".concat(color, ".svg");
};

var toggleDarkLightMode = function toggleDarkLightMode(isLight) {
  isLight = isLight === 'dark' ? false : true;
  nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  textBox.style.backgroundColor = isLight ? 'rgb(0 0 0/ 50%)' : 'rgb(255 255 255 / 50%)';
  toggleIcon.children[0].textContent = isLight ? 'LightMode' : 'Dark Mode';
  toggleIcon.children[1].classList.replace("".concat(isLight ? 'fa-moon' : 'fa-sun'), "".concat(isLight ? 'fa-sun' : 'fa-moon')); // toggleIcon.children[1].classList.remove('fa-sun');
  // toggleIcon.children[1].classList.add('fa-moon');
  // toggleIcon.querySelector('.toggle-text').textContent = 'Dark Mode';
  // toggleIcon.querySelector('i').classList.remove('fa-sun');
  // toggleIcon.querySelector('i').classList.add('fa-moon');

  imageMode("".concat(isLight ? 'light' : 'dark'));
}; // 다크모드
// const darkMode = () => {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//     // toggleIcon.children[1].classList.remove('fa-sun');
//     // toggleIcon.children[1].classList.add('fa-moon');
//     // toggleIcon.querySelector('.toggle-text').textContent = 'Dark Mode';
//     // toggleIcon.querySelector('i').classList.remove('fa-sun');
//     // toggleIcon.querySelector('i').classList.add('fa-moon');
//     imageMode('dark')
// }
// // 라이트모드
// const lightMode = () => {
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0/ 50%)';
//     toggleIcon.children[0].textContent = 'Light Mode';
//     toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//     // toggleIcon.children[1].classList.remove('fa-moon');
//     // toggleIcon.children[1].classList.radd('fa-sun');
//     imageMode('light')
// }


var switchTheme = function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleDarkLightMode('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleDarkLightMode('light');
  }
};

toggleSwitchs.addEventListener('change', switchTheme); // 로컬스토리지 확인하기

var currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitchs.checked = true;
    toggleDarkLightMode('dark');
  } else {
    toggleSwitchs.checked = false;
    toggleDarkLightMode('light');
  }
}