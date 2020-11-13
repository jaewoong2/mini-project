(() => {
    const userInfo = navigator.userAgent.toLowerCase();
    if(userInfo.indexOf('android') > -1) {
        setTimeout(() => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
        }, 5000);
        window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
        // 인텐트 주소
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        setTimeout(() => {
            window.location.href = "https://apps.apple.com/kr/app/그라운드/id1483838254"
        }, 5000);
        window.location.href = "https://apps.apple.com/kr/app/그라운드/id1483838254";
        
    } else {
        console.log('아무것도 아님')
    }
})()