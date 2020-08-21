(() => {
    let count = 5;
    const imageContainer = document.getElementById('image-container');
    const loader = document.getElementById('loader')
    
    let photosArray = [];
    
    async function getPhtos() {
        try {
            // const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${'tQC67yDvw12IDAPmbZX4qLLHf8koV4hPJhbxJdH1gno'}&count=${count}`;
            loader.hidden = false;
            // const res = await fetch(apiUrl);
            photosArray = await (() => {
                const arr = [];
                for(let i = 0; i < count; i++) {
                    arr.push(`https://source.unsplash.com/collection/${parseInt(Math.random() * 150, 10)}`)
                }
                return arr
            })()
            displayPhotos();
        } catch (err) {
            console.error(err)
        }
    }
    
    function setAttributes(element, attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key])
        }
    }


    function displayPhotos() {
        photosArray.forEach((photo, index) => {
            const item = document.createElement('a');
            // setAttributes(item, {
            //     href : photo.links.html,
            //     target : '_blank'
            // })
            // item.setAttribute('href', photo.links.html)
            // item.setAttribute('target', '_blank');

            const img = document.createElement('img');
            img.src = photo
            // setAttributes(img, {
            //     src : photo.urls.regular,
            //     alt : photo.alt_description,
            //     title : photo.alt_description,
            // })
            // img.setAttribute('src', photo.urls.regular)
            // img.setAttribute('alt', photo.alt_description)
            // img.setAttribute('title', photo.alt_description)
            item.appendChild(img)
            imageContainer.appendChild(item)
            if(photo === photosArray[photosArray.length - 1]) {
                img.addEventListener('load', () => {
                    loader.hidden = true;
                    count = 10;
                })
            }
        });
    }

//  check scroll

    window.addEventListener('scroll', () => {
        if(window.innerHeight + window.scrollY + 100> document.body.clientHeight) {
            if(loader.hidden) {
                getPhtos()
            }
        }
    });



    getPhtos()
})()

