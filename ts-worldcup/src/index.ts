import './styles.css';
import Elem from "./dom";
import { Image_, ImageController } from "./images";
import getImage from "./utils/getImage";

function init() {
    Image_.len = 8;
    for (let i = 0; i < Image_.len; i++) {
        Image_.images.push({ src: getImage(i), key: i });
    }
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

window.onload = init;
