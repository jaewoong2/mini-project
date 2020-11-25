window.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 5;
    // ctx.strokeRect(100, 100, 200, 500);
    // ctx.strokeStyle = "blue";
    // ctx.lineWidth = 3;
    // ctx.strokeRect(200, 200, 200, 500);

    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 100);
    // ctx.lineTo(200, 150);
    // ctx.closePath();
    // ctx.stroke();
    

    // 변수
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
    }

    function draw(e) {
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round'; // 둥글게 그려짐
        

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    // EvnetListeners;
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})