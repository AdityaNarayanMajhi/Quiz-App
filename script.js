let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : 'WWW stands for ?',
        options : [
            'World Whole Web', 
            'Wide World Web', 
            'Web World Wide', 
            'World Wide Web'
        ],
        answer : '3',
        score : 1
    },
    { 
       
        title : 'Which language runs in a web browser ?',
        options : [
            'Java',
            'C',
            'Python',
            'JavaScript'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'Which company developed JavaScript ?',
        options : [
            ' Microsoft',
            ' Apple',
            'Sun Microsystems',
            'Netscape'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'Where is RAM located ?',
        options : [
            'Expansion Board',
            'External Drive',
            'Mother Board',
            'All of above'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'Which HTTP method is used to request data from a server ?',
        options : [
            'POST',
            'GET',
            'PUT',
            'DELETE'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'If a computer provides database services to other, then it will be known as ?',
        options : [
            'Web server',
            'Application server',
            'Database server',
            'FTP server'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'What does CSS stand for?',
        options : [
            'Central Style Sheets',
            'Cascading Style Sheets',
            'Cascading Simple Sheets',
            'Cars SUVs Sailboats'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'In which of the following form, data is stored in computer ?',
        options : [
            'Decimal',
            'Binary',
            'HexaDecimal',
            'Octal'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Which data type is NOT supported by JavaScript ?',
        options : [
            'String',
            'Number',
            'Boolean',
            'Character'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'What does HTML stand for ?',
        options : [
            'HyperText Machine Language',
            'HyperText and Markup Language',
            'HyperText Markup Language',
            'HyperTool Multi Language'
        ],
        answer : '2',
        score : 1
    }
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Please select an option');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();