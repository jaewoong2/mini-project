(() => {
    const userInfo = navigator.userAgent.toLowerCase();
    if(userInfo.indexOf('android') > -1) {
        window.location.href = "https://play.google.com/store/apps/details?id=net.daum.android.map"
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        window.location.href = "https://itunes.apple.com/kr/app/instagram/id389801252?mt=8";
    } else {
        console.log('아무것도 아님')
    }
})()