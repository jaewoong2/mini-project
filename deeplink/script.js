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
                window.location.href = 'ground://';
                await sleep(2000)
                // 앱이 없으면
                if(window.confrim('플레이 스토어로 가시겠습니까?')) {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
                }
            }, 0)
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        // ios
        setTimeout(async () => {
            window.location.href = 'https://share.yourssu.com/posts/1/1';
            await sleep(2000)
            // 앱이 없으면

            if(window.confrim('앱 스토어로 가시겠습니까?')) {
                window.location.href = "https://itunes.apple.com/kr/app/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C/id1483838254";
            }
        }, 0);
    } else {
    }
})()