class View {
    static viewAlert(msg) {
        alert(msg);
    }

    static disabledButton(button) {
        button.disabled = true;
        button.classList.remove('send-email');
        button.classList.add('disabled-button');
        button.innerText = '통신중입니다.';
    }

    static abledButton(button) {
        button.disabled = false;
        button.classList.remove('disabled-button');
        button.classList.add('send-email');
        button.innerText = '메일발송';
    }

    static showSuccessBox(email) {
        const div = document.createElement('div');
        div.classList.add('success-div');
        div.innerHTML = `${email}<br>메일이 발송되었습니다.<br>메일을 확인해주세요.`;
        document.querySelector('.findpw-content-box').innerHTML = '';
        document.querySelector('.findpw-content-box').appendChild(div);
    }
}

export { View };