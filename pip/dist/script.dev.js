"use strict";

(function () {
  var videoElement = document.getElementById('video');
  var button = document.getElementById('button'); // Propmt to select media stream, pass to video elemet, then play

  function selecMediaStream() {
    var mediaStram;
    return regeneratorRuntime.async(function selecMediaStream$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(navigator.mediaDevices.getDisplayMedia());

          case 3:
            mediaStram = _context.sent;
            videoElement.srcObject = mediaStram;

            videoElement.onloadedmetadata = function () {
              videoElement.play();
            };

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  }

  ;
  button.addEventListener('click', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Disable Btn
            button.disalbed = true;
            _context2.next = 3;
            return regeneratorRuntime.awrap(videoElement.requestPictureInPicture());

          case 3:
            button.disalbed = false;

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  selecMediaStream();
})();