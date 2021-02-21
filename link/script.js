(async () => {
    const qs = new URLSearchParams(location.search);
    const hash = qs.get("id");
    const userInfo = navigator.userAgent.toLowerCase();

    async function fetch_hash(hash, env) {
        // 백엔드 서버 완료시
        const url = await fetch(`http://test.ground.yourssu.com:8080/swagger-ui/index.html#/deeplink-controller/v1/shortened-url/${hash}?env=${env}`, {
            method: "GET",
        })

        if (env === "ANDROID") {
            // return "ground://articleEnd?boardId=3&postId=4"
            return url
        }

        if (env === "IOS") {
            return url
            // return "https://share.ground.yourssu.com/articleEnd?boardId=4&postId=4"
        }

        // return "/"
        return url
    }
    
    // 안드로이드
    if(userInfo.indexOf('android') > -1) {
        const url =  await fetch_hash(hash, 'ANDROID')
        const isGoToGround = window.confirm("그라운드 앱에서 확인하기") 
        if (isGoToGround) {
            console.log(url)
            // window.location.href = url
        }
        // window.location.href = `https://share.yourssu.com/p/${id}`;
        // window.location.href = `ground://boards/${id.boardId}/posts/${id.postId}`

            setTimeout(() => {
                // 앱이 없으면
                const isYes = window.confirm('플레이 스토어로 가시겠습니까?')
                if(isYes) {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US"
                }
            }, 2000)
    } else if(userInfo.indexOf('iphone') > -1 || userInfo.indexOf('ipad') > -1 || userInfo.indexOf('ipod') > -1) {
        // ios
        const url =  await fetch_hash(hash, 'IOS')
                const isGoToGround = window.confirm("그라운드 앱에서 확인하기") 
        if (isGoToGround) {
            console.log(url)
            // window.location.href = url
        }
        // window.location.href = `https://share.yourssu.com/p/${id}`;
        setTimeout( () => {
            const isYes = window.confirm('앱 스토어로 가시겠습니까?')
            if(isYes) {
                window.location.href = "https://itunes.apple.com/kr/app/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C/id1483838254";
            }
        }, 2000);
    } else {
        // 웹
        const url =  await fetch_hash(hash, 'WEB')
        console.log(url)
        window.alert("모바일 어플에서 확인해주세요.")
        // window.location.href = url
        // window.location.href = `https://share.yourssu.com/${id}`;
    }
})()