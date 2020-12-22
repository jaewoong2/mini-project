const heartBtn = document.querySelector('.heart-btn');
const title = document.querySelector('.title');
const letter = document.querySelector('.letter');
function sleep(ms = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (ms));
    })
}
document.body.addEventListener("load", (async () => {
    const time = 1500;
    sleepANDText("정말 축하해 효림아 너 제천간 이후로");
    await sleep(time)
    sleepANDText(" 오늘만을 계속해서 기다렸어 ㅋㅋㅋ");
    await sleep(time)
    sleepANDText(" 너무 시간이 안가는거 같더라구 ㅠㅠ");
    await sleep(time)
    sleepANDText("오늘 정말 너랑 같이 놀 생각에 너무너무 기대 만땅이야");
    await sleep(time)
    sleepANDText(" 효림이가 12월 시작을 내생일로 시작해서 좋다고 한것처럼");
    await sleep(time)
    sleepANDText(" 나도 한해의 마무리를 너랑 같이 너의 생일로 보내게되서");
    await sleep(time)
    sleepANDText(" 정말 좋아 물론 크리스마스도 있고");
    await sleep(time)
    sleepANDText(" 내년 1 / 1 도 있지만, 효림이가 제천 오랬동안 갔다가");
    await sleep(time)
    sleepANDText(" 돌아와서 그런지 그냥 보고싶네~ ㅋㅋ 귀염둥이");
    await sleep(time)
    sleepANDText(" 편지를 써줄까 카톡으로 보내줄까하다가");
    await sleep(time)
    sleepANDText(" 그냥 이렇게 보내주는 것도 재밌을것 같아서");
    await sleep(time)
    sleepANDText(" 이렇게 써서 보내 정말 사랑해 아가야");
    await sleep(time);
    
    const more = (await sleepANDText("  더보기  "));
    more.className = "more";
    more.addEventListener("click", async () => {
        const sleepTexts = document.querySelectorAll(".sleep-text");
        sleepTexts.forEach(async (text) => {
            text.style.opacity = 0;
            await sleep(1400);
        });
        await sleep(1500);
        letter.innerHTML = "";
        sleepANDText("진짜 오랜만에 편지 쓰는거 같아서. ㅎㅎㅎ ");
        await sleep(time)
        sleepANDText(" 어떤 말을 해야할지 모르겠다잉 ㅠㅠ");
        await sleep(time)
        sleepANDText(" 딱 선물 들고 가서 생일때 짜잔하고 주고싶었는데");
        await sleep(time)
        sleepANDText(" 왜 ㅠㅠ 안오는건지 택배놈들!! 짜증나 중말");
        await sleep(time)
        sleepANDText(" 효림이가 내가 좋아하는 게임 좋아해줘서 고맙고");
        await sleep(time)
        sleepANDText(" 효림이가 먹는거 좋아해서 나도 좋고");
        await sleep(time)
        sleepANDText(" 우리가 벌써 1년하고도 몇개월이 지났다는게 참 신기해");
        await sleep(time)
        sleepANDText(" 벌써 각자 두번째 생일이네 ㅋㅋㅋㅋ 신기방구❤ ");
        await sleep(time)
        sleepANDText(" 우리 언능 만나서 빨리 얼굴보자구 아가둥! ");
        await sleep(time)
        sleepANDText(" 오늘 가족끼리 시간 보내느라 바빠서 연락이 안되는거 같지만 ㅎㅎ");
        await sleep(time)
        sleepANDText(" 아침까지 생일 가족이랑 잘보내고!");
        await sleep(time)
        sleepANDText(" 생일 정말 축하해 아가야~");
        await sleep(time);
    });
})());


async function sleepANDText(text) {
    const span = document.createElement("span");
    span.style.opacity = 0;
    span.style.transition = "opacity 1s";
    span.className = "sleep-text";
    span.innerText = text;
    letter.appendChild(span);
    await sleep(2000)
    span.style.opacity = 1;

    return span;
}