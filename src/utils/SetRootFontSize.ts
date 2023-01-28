const baseFontSize = 16;
const UI_DESIGN = 375;

function setRealRoot(): void {
    const realWidth = document.documentElement.clientWidth;
    const rawRatio = realWidth / UI_DESIGN;
    
    let realRatio: number = rawRatio;

    // 手机宽度只适应到375到750，因此要限值
    if (rawRatio < 1) realRatio = 1;
    else if (rawRatio > 2) realRatio = 2;

    document.documentElement.style.fontSize = `${baseFontSize * realRatio}px`;
}

setRealRoot();
window.onresize = (): void => {
    setRealRoot();
};
