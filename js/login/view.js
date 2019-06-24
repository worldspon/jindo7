// View Class
class View {

    static showCheckImg(target, showBoolean) {
        target.style.backgroundImage = showBoolean ? 'url("./images/login_check.png")' : 'none';
    }

    static showTooltipText(showBoolean) {
        document.querySelector('.tooltiptext').style.display = showBoolean ? 'block' : 'none';
    }

    static showAlert(msg) {
        alert(msg);
    }
}

export { View };