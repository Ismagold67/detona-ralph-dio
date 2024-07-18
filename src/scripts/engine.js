const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        hp: document.querySelector("#hp"),
        body: document.querySelector('body'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        healthPoints: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000)
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        const div = document.createElement('div')
        const button = document.createElement('button')
        const p = document.createElement('p')
        p.innerHTML = `GAME OVER!!! <br> O seu resultado foi <br><br> <span>${state.values.result}</span>`
        button.classList.add('res')
        button.textContent = 'RECOMEÇAR!'
        div.classList.add('msgRestart')
        div.appendChild(p)
        div.appendChild(button)
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        state.view.body.appendChild(div)   
        
        button.addEventListener('click', () => {
            window.location.reload(true);
        })
    }
}

function loseLifePoints(){
    state.values.healthPoints--;
    state.view.hp.textContent = `x${state.values.healthPoints}`;
    if(state.values.healthPoints <= 0){
        state.values.currentTime = 1;
    }
}

function playSound(audioName) {
let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function erro(square){
    square.classList.add("error")
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            const img = document.createElement('img')
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                square.classList.add('anime')
                img.src = './src/imgs/trinco.png'
                square.appendChild(img);
                playSound("hit");
                playSound("soco");
                playSound("dano");
                setTimeout(function(){
                    square.removeChild(img)
                    square.classList.remove('anime')
                },100)
                square.classList.add('rotate-cursor');
                setTimeout(function () {
                    square.classList.remove('rotate-cursor')
                },100)
            } else{
                square.textContent = 'X'
                erro(square)
                loseLifePoints()
                playSound("falhou")
                setTimeout(function() {
                    square.textContent = '';
                },100)
                square.classList.add('rotate-cursor');
                setTimeout(function () {
                    square.classList.remove('rotate-cursor')
                },100)
            }
        })
    })
}



// function rotateCursor() {
//     let refSquare = state.view.squares
//     let refEnemy = state.view.enemy
//     refSquare.forEach(square => {
//         square.addEventListener('click', () => {
//             square.classList.add('rotate-cursor');
//             setTimeout(function () {
//                 square.classList.remove('rotate-cursor')
//             },100)
//         })
//     })
//     refEnemy.addEventListener('click', ()=> {
//         console.log('acheu')
//     })
// }



function initialize() {
    addListenerHitBox();
}

initialize();