const toggleSwitchs = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.querySelector('#toggle-icon');
const imageOne = document.getElementById('image1');
const imageTwo = document.getElementById('image2');
const imageThree = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Dark or Light Images

const imageMode = (color) => {
    imageOne.src = `img/undraw_proud_coder_${color}.svg`
    imageTwo.src = `img/undraw_feeling_proud_${color}.svg` 
    imageThree.src = `img/undraw_conceptual_idea_${color}.svg` 
}

const toggleDarkLightMode = (isLight) => {
    isLight = isLight === 'dark' ? false : true;
    nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = isLight ? 'rgb(0 0 0/ 50%)' : 'rgb(255 255 255 / 50%)';

    toggleIcon.children[0].textContent = isLight ? 'LightMode' : 'Dark Mode';
    toggleIcon.children[1].classList.replace(`${isLight ? 'fa-moon' : 'fa-sun'}`, `${isLight ? 'fa-sun' : 'fa-moon'}`);
    // toggleIcon.children[1].classList.remove('fa-sun');
    // toggleIcon.children[1].classList.add('fa-moon');

    // toggleIcon.querySelector('.toggle-text').textContent = 'Dark Mode';
    // toggleIcon.querySelector('i').classList.remove('fa-sun');
    // toggleIcon.querySelector('i').classList.add('fa-moon');
    imageMode(`${isLight ? 'light' : 'dark'}`)
}


// 다크모드
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

const switchTheme = (event) => {
    if(event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode('light');
    }
}

toggleSwitchs.addEventListener('change', switchTheme)

// 로컬스토리지 확인하기
const currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark') {
        toggleSwitchs.checked = true;
        toggleDarkLightMode('dark');
    } else {
        toggleSwitchs.checked = false;
        toggleDarkLightMode('light');
    }
}