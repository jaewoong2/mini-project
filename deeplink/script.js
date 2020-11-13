(() => {
    const userInfo = navigator.userAgent.toLowerCase();
    if(userInfo.indexOf('android')) {
        window.location.href = "intent://instagram.com/#Intent;package=com"
    } else if(userInfo.indexOf('iphone') || userInfo.indexOf('ipad') || userInfo.indexOf('ipod')) {
        window.location.href = "https://itunes.apple.com/kr/app/instagram/id389801252?mt=8";
    } else {
        console.log('아무것도 아님')
    }
})()