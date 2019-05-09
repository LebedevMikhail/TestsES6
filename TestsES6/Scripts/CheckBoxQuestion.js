import { Question } from './Question'

export class CheckboxQuestion extends Question {
    init(callback) {
        const self = this;
        self.timer = null;
        let div = document.createElement('div');
        div.className = 'question';
        div.style.cssText = 'margin-left: auto; margin-right: auto; text-align: left; ';
        div.innerHTML += '<p>' + this.text + '</p>';
        for (let i = 0; i < this.options.length; i++) {
            div.innerHTML += '<div>'
            div.innerHTML += '<input class="inputs" type="checkbox" style="margin: 0px auto; text-align: left;" name=\"option' + i
                + '\" value=\'' + this.options[i] + '\' >' + this.options[i];
            div.innerHTML += '</div>'
        }
        div.innerHTML += '<div><input class="btn btn-success" type="submit" id="answerButton" value="Ответить"></div>'
        let container = document.getElementById('container');
        container.appendChild(div);
        let answerButton = document.getElementById('answerButton');
        let timeout = this.timeout.get(this)
        if (timeout) {
            self.timer = window.setTimeout(() => {
                alert('Время для ответа на этот вопрос вышло');
                answerButton.click();
            }, timeout * 1000);
        }
        answerButton.onclick = () => {
            debugger
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.handleNext()
            callback(self);
        };

    }

    handleNext() {
        let inputs = document.getElementsByClassName('inputs');
        let userAnswers = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                userAnswers.push(inputs[i].value);
            }
        }
        super.handleNext(userAnswers);
    }
}