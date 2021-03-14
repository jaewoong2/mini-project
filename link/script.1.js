// ()();
async function onLoadInit() {
  const qs = new URLSearchParams(location.search);
  const hash = qs.get("id");
  const userInfo = navigator.userAgent.toLowerCase();

  async function fetch_hash(hash, env) {
    const backUrl = `https://test.ground.yourssu.com/v1/shortened-url/${hash}?env=${env}`;

    return fetch(backUrl, {
      method: "GET",
      mode: "cors",
    }).then((res) => res.json());
  }

  // 안드로이드
  if (userInfo.indexOf("android") > -1) {
    try {
      const url = await fetch_hash(hash, "ANDROID");

      const timer = setTimeout(() => {
        // 앱이 없으면
        const isYes = window.confirm("플레이 스토어로 가시겠습니까?");

        if (isYes) {
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.yourssu.ground&hl=ko&gl=US";
        }
      }, 2000);

      // 앱이 있는지 없는지 모르기전에,
      // 앱이 없으면 원래는 자동으로 넘어갈라 했는데,
      // 일단 확인 후 넘기기!
      if (!url.url) {
        window.alert("잘못된 접근");
        new Error();
      } else {
        const isGoToGround = window.confirm("그라운드 앱에서 확인하기");
        if (isGoToGround) {
          // window.location.href = url.url;
          window?.location?.replace(url.url);
          clearTimeout(timer);
        }
      }
    } catch (err) {
      console.error(err);
      // window.location.href = "/";
    }
  } else if (
    userInfo.indexOf("iphone") > -1 ||
    userInfo.indexOf("ipad") > -1 ||
    userInfo.indexOf("ipod") > -1
  ) {
    // ios
    try {
      const url = await fetch_hash(hash, "IOS");

      const timer = setTimeout(() => {
        // 앱이 없을때
        const isYes = window.confirm("앱 스토어로 가시겠습니까?");
        if (isYes) {
          window.location.href =
            "https://apps.apple.com/kr/app/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C/id1483838254";
        }
      }, 2000);

      if (!url.url) {
        window.alert("잘못된 접근");
        new Error();
      } else {
        const isGoToGround = window.confirm("그라운드 앱에서 확인하기");
        if (isGoToGround) {
          // window.location.href = url.url;
          window?.location?.replace(url.url);
          clearTimeout(timer);
        }
      }
    } catch (err) {
      console.error(err);
      // window.location.href = "/";
    }
  } else {
    // 웹
    window.alert("모바일에서 확인해주세요.");
  }
}

window.onload = onLoadInit();
