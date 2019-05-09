import 'whatwg-fetch';
import { RadioQuestion } from './RadioQuestion';
import { CheckboxQuestion } from './CheckboxQuestion';
import { Question } from './Question'

let instance = null;

export class TestController {
    constructor(_questionCount, _questionIndex, _serviceUrl) {
        instance = this;
        this.questionCount = _questionCount;
        this.questionIndex = _questionIndex;
        this.serviceUrl = _serviceUrl + "/" + instance.questionCount;
        return instance;
    }

    async init() {
        let generator = instance.questionGenerator();
        for await (const question of generator) {
            instance.addQuestionToList(question);
        }
        let testResult = Question.getScore() || 0;
        instance.showResult(testResult);
    }

    async *questionGenerator() {
        await instance.ajaxToService(instance.questionCount);
        for (let index = instance.questionIndex; index <= instance.questionCount; index++) {
            let result = instance.createNewQuestionObject();
            yield await result;
        }
    }

    ajaxToService(questionCount) {
        return window.fetch(instance.serviceUrl,
            {
                method: "POST",
                body: questionCount
            }
        );
    }

    async createNewQuestionObject() {
        instance.clearContainer();
        let question = await instance.loadQuestionData()
        if (question) {
            container.innerHTML += '<h2>Вопрос ' + instance.questionIndex + ' из ' + instance.questionCount + '</h2>'
        }
        return new Promise((resolve) => {
            question.init(resolve);
        })
    }

    async loadQuestionData() {
        try {
            const response = await window.fetch('./Question/GetNextQuestion', {
                method: 'GET',
            });
            const text = await response.text();
            if (text) {
                let question = instance.questionFactory(text, instance.decryptString);
                return question;
            }
        }
        catch (e) {
            return console.log('Error with create question');
        }
    }

    questionFactory(encryptedQuestion, decryptString) {
        let currentQuestion = null;
        let parsingQuestion = JSON.parse(encryptedQuestion);
        if (parsingQuestion) {
            let numberAnswers = parsingQuestion.answers.split('#;').length || 1;
            let text = decryptString(parsingQuestion.text);
            let timeout = parsingQuestion.timeout;
            let decryptOptions = [];
            let encryptedOptions = parsingQuestion.options.split('#;');
            for (let i = 0; i < encryptedOptions.length; i++) {
                decryptOptions.push(decryptString(encryptedOptions[i]));
            }
            if (numberAnswers == 1) {
                let answer = decryptString(parsingQuestion.answers)
                currentQuestion = new RadioQuestion(answer, decryptOptions, text, timeout);
            } else {
                let encryptedAnswers = parsingQuestion.answers.split('#;');
                let decryptedAnswers = [];
                for (let i = 0; i < encryptedAnswers.length; i++) {
                    decryptedAnswers.push(decryptString(encryptedAnswers[i]));
                }
                currentQuestion = new CheckboxQuestion(decryptedAnswers, decryptOptions, text, timeout);
            }
            return currentQuestion;
        }
    }

    decryptString(encryptedString) {
        return decodeURIComponent(escape(window.atob(encryptedString)));
    }

    addQuestionToList(question) {
        if (!instance.questionList) {
            instance.questionList = [];
        }
        if (question) {
            instance.questionList.push(question);
            this.questionIndex++;
        }
    }

    showResult(resultTest) {
        window.fetch('./Question/Result', {
            method: 'POST',
            body: resultTest
        }).then(responce => {
            container.innerHTML += responce.text().then((text) => {
                instance.clearContainer()
                container.innerHTML += text;
            })
        }).catch(() => console.log('Error with getting text response result'))
            .catch(() => console.log('Error with show test result'));
    }

    clearContainer() {
        document.getElementById('container').innerHTML = '';
    }
}