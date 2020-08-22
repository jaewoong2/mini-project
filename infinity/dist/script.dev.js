"use strict";

(function () {
  var count = 5;
  var imageContainer = document.getElementById('image-container');
  var loader = document.getElementById('loader');
  var photosArray = [];

  function getPhtos() {
    return regeneratorRuntime.async(function getPhtos$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${'tQC67yDvw12IDAPmbZX4qLLHf8koV4hPJhbxJdH1gno'}&count=${count}`;
            loader.hidden = false;
            document.body.style.overflowY = 'hidden'; // const res = await fetch(apiUrl);

            _context.next = 5;
            return regeneratorRuntime.awrap(function () {
              var arr = [];

              for (var i = 0; i < count; i++) {
                arr.push("https://source.unsplash.com/collection/".concat(parseInt(Math.random() * 150, 10)));
              }

              return arr;
            }());

          case 5:
            photosArray = _context.sent;
            displayPhotos();
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }

  function setAttributes(element, attributes) {
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  function displayPhotos() {
    photosArray.forEach(function (photo, index) {
      var item = document.createElement('a'); // setAttributes(item, {
      //     href : photo.links.html,
      //     target : '_blank'
      // })
      // item.setAttribute('href', photo.links.html)
      // item.setAttribute('target', '_blank');

      var img = document.createElement('img');
      img.src = photo; // setAttributes(img, {
      //     src : photo.urls.regular,
      //     alt : photo.alt_description,
      //     title : photo.alt_description,
      // })
      // img.setAttribute('src', photo.urls.regular)
      // img.setAttribute('alt', photo.alt_description)
      // img.setAttribute('title', photo.alt_description)

      item.appendChild(img);
      imageContainer.appendChild(item);

      if (photo === photosArray[photosArray.length - 1]) {
        img.addEventListener('load', function () {
          loader.hidden = true;
          document.body.style.overflowY = 'scroll';
          count = 10;
        });
      }
    });
  } //  check scroll


  window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY + 100 > document.body.clientHeight) {
      if (loader.hidden) {
        getPhtos();
      }
    }
  });
  getPhtos();
})();