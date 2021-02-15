(() => {
    const qs = new URLSearchParams(location.search);
    const id = qs.get("id");
    const userInfo = navigator.userAgent.toLowerCase();

    // 안드로이드
    if(userInfo.indexOf('android') > -1) {
        window.location.href = `https://share.yourssu.com/p/${id}`;
        // window.location.href = `ground://boards/${id.boardId}/posts/${id.postId}`
            setTimeout( () => {
                // 앱이 없으면
                isYes = window.confirm('플레이 스토어로 가시겠습니까?')
                if(isYes) {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
                }
            }, 2000)
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        // ios
        window.location.href = `https://share.yourssu.com/p/${id}`;
        setTimeout( () => {
            isYes = window.confirm('앱 스토어로 가시겠습니까?')
            if(isYes) {
                window.location.href = "https://itunes.apple.com/kr/app/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C/id1483838254";
            }
        }, 2000);
    } else {
        // 웹
        window.location.href = `https://share.yourssu.com/${id}`;
    }
})()