// 신규 답변 객체
class newAnswerObject {
    constructor(qid, text) {
        return {
            questionId : qid,
            content : text
        }
    }
}

// 수정 답변 객체
class modifyAnswerObject {
    constructor(qid, aid, text) {
        return {
            questionId : qid,
            id : aid,
            content : text
        }
    }
}

// 삭제 답변 객체
class deleteAnswerObject {
    constructor(aid) {
        return {
            id : aid
        }
    }
}

export { newAnswerObject, modifyAnswerObject, deleteAnswerObject };