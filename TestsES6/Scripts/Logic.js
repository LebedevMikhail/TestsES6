import { TestController } from './TestController';
import { Question } from './Question'

window.start = () => {
    Question.cleanScore();
    showForm();
    let numberQuestions = 5;
    let numberFirstIndex = 1;
    let urlForInitialization = './Question/TestInit';
    let testController = new TestController(numberQuestions, numberFirstIndex, urlForInitialization);
    testController.init();
}

window.showForm = () => {
    let container = document.getElementById('container');
    container.innerHTML = '';
    container.removeAttribute('hidden');
    document.getElementById('restartButton').removeAttribute('hidden');
    document.getElementById('startButton').setAttribute('hidden', 'true');
}
