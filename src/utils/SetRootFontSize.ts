const baseFontSize = 16;
const UI_DESIGN = 375;

function setRealRoot(): void {
    const realWidth = document.documentElement.clientWidth;

    // 手机宽度只适应到375到750，因此要限值
    const rawRatio = realWidth / UI_DESIGN;
    let realRatio: number = 1;
    if (rawRatio < 1) realRatio = 1;
    else if (rawRatio > 2) realRatio = 2;
    else realRatio = rawRatio;

    document.documentElement.style.fontSize = `${baseFontSize * realRatio}px`;
}

setRealRoot();
window.onresize = (): void => {
    setRealRoot();
};
