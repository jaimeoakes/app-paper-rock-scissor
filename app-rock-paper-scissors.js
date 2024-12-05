let score = localGetStorage() || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement();


let isAutoPlaying = false;
let intervalId;
// modo Auto play;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock'){
    if (computerMove === 'rock'){            
        result = 'Tie.';
  } else if(computerMove === 'paper'){
        result = 'You lose.';
  } else if(computerMove === 'scissors')
        result = 'You win.';
}
  if (playerMove === 'paper'){
      if (computerMove === 'rock'){            
          result = 'You win.';
    } else if(computerMove === 'paper'){
          result = 'Tie.';
    } else if(computerMove === 'scissors')
          result = 'You lose.';
}
  if (playerMove === 'scissors'){
      if (computerMove === 'rock'){            
          result = 'You lose.';
    } else if(computerMove === 'paper'){
          result = 'You win.';
    } else if(computerMove === 'scissors')
          result = 'Tie.';
}
  if (result === 'You win.'){
      score.wins++;
  } else if(result === 'You lose.'){
      score.losses++;
  } else if(result === 'Tie.'){
      score.ties++;
}


localSetStorage();


updateScoreElement();


document.querySelector('.js-result'). // updating o result na pagina;
innerHTML = result;

document.querySelector('.js-moves'). // updating o score na pagina;
innerHTML = `You picked
<img src="images/${playerMove}-emoji copy.png" class="move-icon">
<img src="images/${computerMove}-emoji copy.png" class="move-icon">
Computer`;
  
}


function updateScoreElement(){        // updating o score na pagina;
  document.querySelector('.js-score') // alterando o texto <p></p> em html;
    .innerHTML = `Wins: ${score.wins},
  Losses: ${score.losses},
  Ties: ${score.ties}.`
}


function localSetStorage(){
  localStorage.setItem('score', JSON.stringify(score)); // chaves no localStorage são sempre strings;
}


function localGetStorage(){
  return JSON.parse(localStorage.getItem('score'));
}


function pickComputerMove(){
  const randomMove = Math.random();
  let computerMove = '';

  if (randomMove >= 0 && randomMove < 1/3) {
    computerMove = 'rock';

  } else if(randomMove >= 1/3 && randomMove < 2/3) {
    computerMove = 'paper';

  } else if(randomMove >= 2/3 && randomMove < 1) {
    computerMove = 'scissors';
  }
      return computerMove;
}
