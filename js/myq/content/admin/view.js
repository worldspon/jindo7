class View {

    // 수정답변 작성 에디터 표현
    static createAnswerEditor(answerText) {
        const contentWrap = document.querySelector('.myq-content-wrap');

        contentWrap.appendChild(View.createEditorNode());

        $('#summernote').summernote('code', answerText);

    }

    // 텍스트 에디터 노드 생성
    static createEditorNode() {
        const span = document.createElement('span');
        span.innerText = 'A. 수정';

        const firstChildDiv = document.createElement('div');
        firstChildDiv.classList.add('myq-content-l');
        firstChildDiv.appendChild(span);

        const summernoteDiv = document.createElement('div');
        summernoteDiv.id = 'summernote';
        
        const button = document.createElement('button');
        button.classList.add('btn-myq-confirm');
        button.innerText = '등록';

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('btn-myq-answer-box');
        buttonDiv.appendChild(button);

        const secondChildDiv = document.createElement('div');
        secondChildDiv.classList.add('myq-answer-box', 'myq-content-r');

        secondChildDiv.appendChild(summernoteDiv);
        secondChildDiv.appendChild(buttonDiv);

        const textEditorDiv = document.createElement('div');
        textEditorDiv.classList.add('myq-content', 'answer-editor');

        textEditorDiv.appendChild(firstChildDiv);
        textEditorDiv.appendChild(secondChildDiv);

        return textEditorDiv;
    }

    // 답변 작성 에디터 삭제
    static destroyAnswerEditor() {
        document.querySelector('.answer-editor').remove();
    }

    // 경고창 표출
    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };