const description = document.querySelector('.description');
const gameArea = document.querySelector('.game');
const button = document.querySelector('button'); //Submit & START button
const wordArea = document.querySelector('.word');
const resultArea = document.querySelector('.result')
let numberOfMatches = 1;
let firstGame = true;
let check = false;

let totalScore = 0;


button.addEventListener('click', StartGame)
var gamePlay = false;
resultArea.style.display = 'none';


function StartGame() {
    if (button.innerHTML == 'Submit') {

    }
    if (!gamePlay) {
        gamePlay = true;
        if (document.getElementById('checkFirstLetter').checked == true) { check = true; }
        const name = document.getElementById('name').value;
        document.getElementById('enterName').innerHTML = 'Player: ';
        const inputName = document.getElementById('name');
        gameArea.removeChild(inputName);
        const checkFL = document.getElementById('checkFirstLetter');
        gameArea.removeChild(checkFL);
        const lablCFL = document.getElementById('lablCFL');
        gameArea.removeChild(lablCFL);
        document.getElementById('playerName').innerHTML = name;
        button.innerText = "START";
        description.remove();

    }
    else {
        if (!firstGame) {
            RemoveArea();
        }
        button.disabled = true;
        button.style.backgroundColor = "lightgray";
        MakerTryButton();              //Create TRY Button
        MakerInput();                  //Create INPUT Field 
        const word = CreateWord();     //Create a Word
        // const word = wordArray[Math.floor(Math.random() * 20)];
        //console.log(word);
        const wordsplit = word.split('');
        const wordlength = word.length;
        MakerEmptyFields(wordlength);  //Create Empty Fields for the Word

        let hearts = 7;
        let freeSpaces = wordlength;
        resultArea.style.display = 'block';
        document.getElementById('numberOfMatches').innerHTML = numberOfMatches;
        document.getElementById('heartsNumbers').innerHTML = hearts;
        document.getElementById('totalScore').innerHTML = totalScore;

        //-------------------

        const tryBtn = document.querySelector('.try');
        const places = document.querySelectorAll('.letters');

        //putting first letter and similar
        let tryLettersArray=[];
        if (check == true) {
            places[0].innerText = wordsplit[0];
            freeSpaces--;
            tryLettersArray.push(wordsplit[0]);

            for (let i = 1; i < places.length; i++) {
                if (wordsplit[i] == wordsplit[0]) {
                    places[i].innerText = wordsplit[0];
                    freeSpaces--;
                }
            }
        }
        tryBtn.addEventListener('click', function () {

            let tryLetter = document.querySelector('.letterInput').value.toLowerCase();

            //console.log(tryLettersArray);
            var resultCheck = TryLetterCheck(tryLetter, tryLettersArray);
            //console.log(resultCheck);
            //console.log(TryLetterCheck.value);
            let x = 0;  //reduce hearts
            for (let i = 0; i < places.length; i++) {
                if (tryLetter == wordsplit[i] && !resultCheck) {
                    places[i].innerText = tryLetter;
                    freeSpaces--;
                    if (freeSpaces == 0) {
                        alert('You Won');
                        showResult(word);
                        tryBtn.disabled = true;
                        button.disabled = false;
                        button.style.backgroundColor = "magenta";
                        firstGame = false;
                        totalScore += hearts;
                        document.getElementById('totalScore').innerHTML = totalScore;
                        numberOfMatches++;
                    }
                    x++;//the letter exist
                }
                document.querySelector('.letterInput').value = '';
            }
            tryLettersArray.push(tryLetter);

            if (x == 0 && tryLetter != '' && !resultCheck) {//the letter dosn't exist
                hearts--;
                //document.getElementById('title').innerHTML = "Wrong Tried Letters: ";
                document.getElementById('trirdLetters').innerHTML += tryLetter.toUpperCase() + ' ,'
                document.getElementById('heartsNumbers').innerHTML = hearts;
            }
            if (hearts == 0) {
                alert('You Lost');
                showResult(word);
                tryBtn.disabled = true;
                button.disabled = false;
                button.style.backgroundColor = "magenta";
                firstGame = false;
                numberOfMatches++;
                //RemoveArea();
            }

        });

    }

}
function MakerTryButton() {
    let el = document.createElement('button');
    el.innerText = 'TRY';
    el.style.color = 'white';
    el.style.backgroundColor = 'magenta';
    el.style.height = '30px';
    el.style.marginRight = '1px';
    el.id = 'tryButton';
    el.classList.add('try');
    gameArea.appendChild(el);
}

function MakerInput() {
    let el = document.createElement('input');
    el.setAttribute('type', 'text');
    el.style.borderBlockColor = '#2914e9';
    el.style.height = '30px';
    el.size = 1;
    el.id = 'inputId';
    el.classList.add('letterInput');
    el.maxLength = 1;
    gameArea.appendChild(el);
}

function MakerEmptyFields(wordlength) {
    for (let i = 0; i < wordlength; i++) {
        let elm = document.createElement('button');
        elm.setAttribute('type', 'text');
        //elm.setAttribute('padding', '100px');
        elm.style.marginRight = '4px';
        elm.style.border = 'solid';
        elm.style.border.width = '3px';
        elm.classList.add('letters');
        elm.style.width = '50px';
        elm.style.height = '50px';
        elm.style.fontSize = '22';
        elm.style.color = '#2914e9';
        elm.style.backgroundColor = 'yellow';
        // elm.style.padding='10px';
        // elm.style.paddingLeft='15px';
        wordArea.appendChild(elm);


    }
}

function CreateWord() {
    let numbers = wordRepository.length;
    //console.log(numbers);
    if (numbers != 0) {
        const word = wordArray[Math.floor(Math.random() * numbers)];
        let index = wordRepository.indexOf(word);
        //console.log(index);
        wordRepository.splice(index, 1);
        //console.log(wordRepository);
        return word;
    }
    else {
        alert('You have finished all the words!')
        return '';
    }
}

function showResult(word) {
    document.getElementById('correctWord').innerHTML = 'Correct Word is: <span style=color:green;>' + word +
     '</span><br><p>Hit the START to play again</p>';
    //document.getElementById('meaning').innerHTML =
    //    'Click <a href=https://www.ldoceonline.com/dictionary/' + word + 'target=_blank>Here </a>To Find the Meaning';
}
function RemoveArea() {
    //---------------------------------------------------------
    let elTry = document.getElementById('tryButton');
    gameArea.removeChild(elTry);
    let el = document.querySelector('.letterInput');
    gameArea.removeChild(el);
    //---------------------------------------------------------
    var elem1 = document.getElementById('w1');
    elem1.innerHTML = '';
    //---------------------------------------------------------
    var elem2 = document.getElementById('trirdLetters');
    elem2.innerHTML = '';
    //---------------------------------------------------------
    var elem3 = document.getElementById('correctWord');
    elem3.innerHTML = '';

}

function TryLetterCheck(tryLetter, tryLettersArray) {
    let res = false;
    for (let i = 0; i < tryLettersArray.length; i++) {
        if (tryLetter == tryLettersArray[i])
            res = true;
    }
    return res;
}










const wordArray = ['apple' , 'banana' , 'orange' , 'grape' , 'mango' , 'pineapple' , 'watermelon' ,
					'kiwi' , 'strawberry' , 'blueberry' , 'raspberry' , 'lemon' , 'lime' , 'pear' ,
					'peach' , 'plum' , 'cherry' , 'papaya' , 'avocado' , 'coconut' , 'fig' , 'grapefruit' , 
					'apricot' , 'guava' , 'passionfruit' , 'lychee' , 'cranberry' , 'pomegranate' , 
					'Cantaloupe' , 'honeydew'];
const wordRepository = wordArray;