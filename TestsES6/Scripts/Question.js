let score = 0;

export class Question {
    constructor(_answers, _options, _text, _timeout) {
        this.options = _options;
        this.text = _text;
        this.answers = new WeakMap();
        this.answers.set(this, _answers);
        this.timeout = new WeakMap();
        this.timeout.set(this, _timeout)
    }

    static incrementScore() {
        score++;
    }

    static getScore() {
        return score;
    }
    static cleanScore() {
        score = 0;
    }

    handleNext(userAnswers) {
        let answers = this.answers.get(this);
        if (this.compareTo(userAnswers, answers)) {
            Question.incrementScore();
        }
    }

    compareTo(arr1, arr2) {
        if (!(arr2 instanceof window.Array)) {
            arr2 = arr2.split() || arr2;
        }
        arr1 = arr1.map(obj => JSON.stringify(obj)).sort();
        arr2 = arr2.map(obj => JSON.stringify(obj)).sort();
        return (JSON.stringify(arr1) === JSON.stringify(arr2));
    }
}
