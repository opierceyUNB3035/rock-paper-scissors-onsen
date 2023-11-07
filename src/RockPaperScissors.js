import React, { useState } from 'react';
import { Page, Button, Card, Toolbar, BottomToolbar, Fab} from 'react-onsenui';

import personImage from './images/person.png'; // Update with your actual path
import robotImage from './images/bot.png'; // Update with your actual path
import swordsImage from './images/swords.png'; // Update with your actual path
import rockImage from './images/rock.png';
import paperImage from './images/paper.png';
import scissorsImage from './images/scissors.png';

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  
  const choices = {
    rock: rockImage,
    paper: paperImage,
    scissors: scissorsImage
  };
 
  const reset = () => {
    setComputerScore(0);
    setUserScore(0);
    setUserImage(personImage);
    setBotImage(robotImage);
  }

  const generateComputerChoice = () => {
    const choice = ['rock', 'paper', 'scissors'];
    const randomChoice = choice[Math.floor(Math.random() * choice.length)];
    setComputerChoice(randomChoice);
    return randomChoice;
  };

  const updateScores = (winner) => {
    if (winner === 'user') {
      setUserScore(userScore + 1);
    } else if (winner === 'computer') {
      setComputerScore(computerScore + 1);
    }
    // No else part needed, if it's a tie, no one scores
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "It's a draw!";
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      updateScores("user");
      return 'You win!';
    } else {
      updateScores("computer");
      return 'You lose!';
    }
  };

  const [userImage, setUserImage] = useState(personImage);
  const [botImage, setBotImage] = useState(robotImage);

  const onChoiceClick = (choice) => {
    setUserChoice(choice);
    const computerChoice = generateComputerChoice();
    const result = determineWinner(choice, computerChoice);
    setBotImage(choices[computerChoice]);
    setUserImage(choices[choice]);
    setResult(result);
  };

return (
  <Page renderToolbar={() =>
      <Toolbar>
        <div className="center">Rock-Paper-Scissors</div>
      </Toolbar>
    }>
      <Card>
      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <span>User Score: {userScore}</span> vs <span>Computer Score: {computerScore}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <img src={userImage} alt="Your Choice" style={{ maxWidth: '100%', maxHeight: '100px' }} />
          </div>
          <img src={swordsImage} alt="VS" style={{ width: '50px', height: '50px', margin: '0 16px' }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <img src={botImage} alt="Bot's Choice" style={{ maxWidth: '100%', maxHeight: '100px' }} />
          </div>
      </div>
      </Card>
      <Card>
        <p>Your choice: {userChoice || "-"}</p>
        <p>Computer's choice: {computerChoice || "-"}</p>
        <p>{result}</p>
      </Card>
      <div style={{ position: 'absolute', bottom: 15, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
      <Button modifier="large--cta" onClick={() => onChoiceClick('rock')} style={{ flex: 1 }}>
        Rock
      </Button>
      <Button modifier="large--cta" onClick={() => onChoiceClick('paper')} style={{ flex: 1 }}>
        Paper
      </Button>
      <Button modifier="large--cta" onClick={() => onChoiceClick('scissors')} style={{ flex: 1 }}>
        Scissors
      </Button>
    </div>
    <Fab position='bottom right' onClick={() => reset()}>
        🔄
    </Fab>
    </Page>
  );
};

export default RockPaperScissors;

