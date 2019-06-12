class View {

    // 답변 작성 에디터 표현
    static createAnswerEditor(answerText) {
        const contentWrap = document.querySelector('.myq-content-wrap');
        // const answerEditor = document.createElement('div');
        // answerEditor.setAttribute('class','myq-content');
        // console.log(answerEditor);
        contentWrap.innerHTML += 
        `<div class='myq-content answer-editor'>
            <div class='myq-content-l'>
                <span>A. 수정</span>
            </div>
            <div class='myq-answer-box myq-content-r'>
                <form method="post">
                    <textarea id="summernote" name="editordata" style="white-space: pre-wrap;"></textarea>
                </form>
                <div class="btn-myq-answer-box">
                    <button class="btn-myq-confirm">등록</button>
                </div>
            </div>
        </div>`;
        $('#summernote').summernote('code', answerText);

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

export default View;