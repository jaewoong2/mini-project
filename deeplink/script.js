(() => {
    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        })
    }

    const userInfo = navigator.userAgent.toLowerCase();
    // 안드로이드
    if(userInfo.indexOf('android') > -1) {
            setTimeout(async () => {
                window.location.href = 'ground://posts/1/1';
                await sleep(2000)
                // 앱이 없으면
                window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
            }, 0)
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        // ios
        setTimeout(async () => {
            window.location.href = 'https://share.ground.com/posts/1/1';
            await sleep(2000)
            // 앱이 없으면
            window.location.href = "https://itunes.apple.com/kr/app/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C/id1483838254";
        }, 0);
    } else {
        console.log('아무것도 아님')
    }
})()