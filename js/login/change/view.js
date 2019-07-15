class View {
    static viewAlert(msg) {
        alert(msg);
    }

    static disabledButton(button) {
        button.classList.add('disabled-button');
        button.classList.remove('btn-change-pw');
        button.innerText = '통신중입니다.'
        button.disabled = true;
    }
    static ableButton(button) {
        button.classList.remove('disabled-button');
        button.classList.add('btn-change-pw');
        button.innerText = '변경';
        button.disabled = false;
    }

    static showSuccessDivision() {
        const parentDivision = document.querySelector('.changepw-content-box');
        const div = document.createElement('div');
        div.classList.add('success-div');
        div.textContent = '비밀번호 변경이 완료되었습니다.';
        parentDivision.innerHTML = '';
        parentDivision.appendChild(div);
    }
}

export { View };