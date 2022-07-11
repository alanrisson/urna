let yourVoteTo = document.querySelector('.d1 span');
let occupation = document.querySelector('.d2 span');
let numbers = document.querySelector('.d3')
let description = document.querySelector('.d4');
let warning = document.querySelector(".bottom");
let topRight = document.querySelector(".top-right");
//variaveis de controle de interface ^^^^

let currentStep = 0;
let number = '';
let whiteVote = false;

let steps = [
    {
        title: "VEREADOR",
        numbers: 5,
        candidates: [
            {
                number: "14235",
                name: "Andre Almeida",
                party: "PBDM",
                image: [
                    {url: "14235.jpg", subtitles: 'Vereador'}
                ]
            },
            {
                number: "89532",
                name: "Paulo Augusto",
                party: "PRK",
                image: [
                    {url: "89532.jpg", subtitles: 'Vereador'}
                ]
            }
        ]
    },
    {
        title: "PREFEITO",
        numbers: 2,
        candidates: [
            {
                number: "28",
                name: "Pedroso",
                vice: "Roberto Leão",
                party: "PFDS",
                image: [
                    {url: "28.jpg", subtitles: "Prefeito"},
                    {url: "28vice.jpg", subtitles: "Vice-Prefeito", small: true}
                ]
            },
            {
                number: "37",
                name: "Marcos Antonio",
                vice: "Paulo Roberto",
                party: "PSDF",
                image: [
                    {url: "37.jpg", subtitles: "Prefeito"},
                    {url: "37vice.jpg", subtitles: "Vice-Prefeito", small: true}
                ]
            }
        ]
    }
]

const startStep = () => {
    let step = steps[currentStep];
    let htmlNumber = '';
    number = '';
    whiteVote = false;

    for(let i = 0; i < step.numbers; i++){
        if (i === 0) {
            htmlNumber += '<div class="number blink"></div>'
        } else {
            htmlNumber += '<div class="number"></div>'
        }
        
    }

    yourVoteTo.style.display = 'none';
    occupation.innerHTML = step.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    topRight.innerHTML = '';
    numbers.innerHTML = htmlNumber;
}

const updateInterface = () => {
    let step = steps[currentStep]
    let candidate = step.candidates.filter((item)=>{
        if (item.number === number){
            return true
        } else {
            return false
        }
    });
    if(candidate.length > 0) {
        candidate = candidate[0];
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;

        let htmlPictures = '';
        for(let i in candidate.image) {
            if (candidate.image[i].small){
                htmlPictures+= `<div class="image small"><img src="imagens/${candidate.image[i].url}" alt="Foto do Prefeito">${candidate.image[i].subtitles}</div>`
            } else {
                htmlPictures+= `<div class="image"><img src="imagens/${candidate.image[i].url}" alt="Foto do Prefeito">${candidate.image[i].subtitles}</div>`
            }
            
        }
        topRight.innerHTML = htmlPictures;
    } else {
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="bigWarning blink">VOTO NULO</div>'
    }
}

//controle dos botoes vvvv
const clicked = (n) => {
    let currentNumber = document.querySelector('.number.blink')
    if(currentNumber !== null) {
        currentNumber.innerHTML = n;
        number = `${number}${n}`
        currentNumber.classList.remove('blink')
        if(currentNumber.nextElementSibling !== null){
            currentNumber.nextElementSibling.classList.add('blink')
        } else {
            updateInterface()
        }  
    }
}

const white = () => {
    number = ''
    whiteVote = true;
    yourVoteTo.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="bigWarning blink">VOTO EM BRANCO</div>'
    topRight.innerHTML = ''
}

const erase = () => {
    startStep();
}

const confirm = () => {
    let step = steps[currentStep]
    let confirmedVote = false

    if (whiteVote === true){
        confirmedVote = true
    } else if (number.length === step.numbers) {
        confirmedVote = true
    }

    if(confirmedVote) {
        currentStep++
        if (steps[currentStep] !== undefined){
            startStep()
        } else {
            document.querySelector('.screen').innerHTML = "<div class ='giantWarning blink'>FIM</div>"
        }
    }
}

startStep()