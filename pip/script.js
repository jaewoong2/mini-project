(() => {
    const videoElement = document.getElementById('video');
    const button = document.getElementById('button');
    
    
    // Propmt to select media stream, pass to video elemet, then play
    
    
    async function selecMediaStream() {
        try {
            const mediaStram = await navigator.mediaDevices.getDisplayMedia();
            videoElement.srcObject = mediaStram;
            videoElement.onloadedmetadata = () => {
                videoElement.play()
            }
        } catch(err) {
            console.error(err)
        }
    };

    button.addEventListener('click', async () => {
        // Disable Btn
        button.disalbed = true;
        await videoElement.requestPictureInPicture();
        button.disalbed = false;


    });

    selecMediaStream()
})() 