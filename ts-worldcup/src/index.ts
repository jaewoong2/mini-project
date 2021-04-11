import './styles.css';
import Elem from "./dom";
import { Image_, ImageController } from "./images";
import getImage from "./utils/getImage";

const IMAGE_LENGTH = 8;

function game() {
    Image_.len = IMAGE_LENGTH;
    for (let i = 0; i < Image_.len; i++) {
        Image_.images.push({ src: getImage(i), key: i });
    }
    const main = new Elem({ id: "main" });

    new Elem({
        parent: main.ref,
        id: 'rank',
        refName: 'span',
        css: {
            position: `absolute`,
            color: `white`,
            fontSize: `4rem`,
            zIndex: `2`,
            left: `10%`,
            top: `10px`,
            transition: `transform 1s`,
        }
    })


    const topImagesWrpper = new Elem({
        parent: main.ref,
        refName: "article",
        id: "top-section",
        css: {
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            width: `100%`,
            paddingTop: `10px`,
            height: `45%`,
        }
    });

    const bottomImagesWrpper = new Elem({
        parent: main.ref,
        refName: "article",
        id: "bottom-section",
        css: {
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            paddingBottom: `10px`,
            width: `100%`,
            height: `45%`,
        }
    });

    const topImage = new Image_({ parent: topImagesWrpper.ref, key: -2 });
    const bottomImage = new Image_({ parent: bottomImagesWrpper.ref, key: -1 });

    ImageController.images_ = [topImage, bottomImage];
    ImageController.update();
}

function init() {
    const main = new Elem({
        parent: document.body, refName: "main", id: "main", css: {
            position: `relative`,
            display: `flex`,
            justifyContent: `space-around`,
            alignItems: `center`,
            flexDirection: `column`,
            height: `100vh`,
            minHeight: `100vh`,
            backgroundColor: `rgba(20, 20, 20, 0.94)`
        }
    });

    const h2 = new Elem({
        parent: main.ref,
        refName: 'h2',
        id: 'h2',
        css: {
            color: 'white',
            fontSize: '3em'
        }
    });

    const form = new Elem({
        parent: main.ref,
        refName: "form",
        id: 'form',
        css: {
            position: `relative`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`,
        }
    });

    const startButton = new Elem({
        parent: form.ref,
        refName: 'button',
        id: 'button',
        css: {
            outline: `0`,
            border: `0`,
            borderRadius: '8px',
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            fontSize: `1.2em`,
            padding: `8px`,
            width: `120px`
        }
    });

    startButton.ref.innerText = "시작"

    h2.ref.innerText = '이상형 월드컵'

    startButton.ref.addEventListener('click', () => {
        main.removeChild(form.ref);
        main.removeChild(h2.ref);
        game();
    });
}


window.onload = init;
