const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;


let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        if (e.target.classList.contains('matched')) {
            return;
        }

        e.target.classList.add('active');

    if (!selectedCards [0] || selectedCards[0] !== e.target) {
        selectedCards.push(e.target);
        
        if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = 'Clicks:' + currentAttempts;

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].textContent){
            selectedCards.forEach(card => card.classList.add('matched'));
            selectedCards = [];
            currentMove = 0;
        }
        else { 
            setTimeout (() => {
                selectedCards[0].classList.remove('active');
                selectedCards[1].classList.remove('active');
                selectedCards = [];
                currentMove = 0;
            }, 600);
        }
    }
}
}
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

function randomValue(){
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    }
    else {
        randomValue();
    }
}



for (let i=0; i < totalCards; i++){
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}