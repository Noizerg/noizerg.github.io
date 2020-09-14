const wordEl = document.getElementById('word');
const wrongEl = document.getElementById('wrong-letters');
const playEl = document.getElementById('play-again');
const popupEl = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const final = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-parts')

const words = ['ПИСЬКА','ДМИТРИЙУВАЖАЕМОВИЧ','ДМИТРИЙПИСЬКОВИЧ'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord()
{
    wordEl.innerHTML = `${selectedWord.split('').map(letter =>`<span class ="letter">${correctLetters.includes(letter.toUpperCase()) ? letter.toUpperCase() : ''}</span>`).join('')}`
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    console.log(innerWord);
    console.log(selectedWord);
    if (innerWord === selectedWord)
    {

        final.innerText = 'Congratulations! You won! :)';
        popupEl.style.display = 'flex'

    }
}

function showNotification(){

    notification.classList.add('show');
    setTimeout(()=> {notification.classList.remove('show');},2000)
   
}

function updateWrongLettersEl(){   
    wrongEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors)
        {
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none'
        }
    });
    if(wrongLetters.length === figureParts.length)
    {
        final.innerText = 'Haha You Dead.! :)';
        popupEl.style.display = 'flex'
    }
}



window.addEventListener('keydown', e =>
{
    if (e.keyCode >=65 && e.keyCode <=90)
    {
        const letter = e.key;
      
        if(selectedWord.includes(letter.toUpperCase()))
        {
            if(!correctLetters.includes(letter.toUpperCase()))
            {
                console.log(letter.toUpperCase())
                correctLetters.push(letter.toUpperCase());
                displayWord();
            }
            else
            {
                showNotification();
            }
        }
        else
        {
            if(!wrongLetters.includes(letter.toUpperCase()))
            {
                wrongLetters.push(letter.toUpperCase());
                updateWrongLettersEl();
            }
            else
            {
                showNotification();
            }
        }
    }
});

playEl.addEventListener('click',() => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popupEl.style.display = 'none';
})


displayWord();