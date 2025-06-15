import React, { useState } from 'react';
import './App.css';
import Scene1 from './components/Scene1';
import Scene2 from './components/Scene2';
import Scene3 from './components/Scene3';
import Scene4 from './components/Scene4';
import Scene5 from './components/Scene5';


export interface SelectedCard {
  id: number;
  value: string;
  suit: string;
  imagePath: string;
}

export interface GameResult {
  cardNumber: number;
  selectedCard: SelectedCard;
  prize: string;
  isWin: boolean;
}

function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const nextScene = () => {
    setCurrentScene(prev => prev + 1);
  };

  const resetGame = () => {
    setCurrentScene(1);
    setGameResult(null);
  };

  const handleCardSelect = (cardNumber: number, selectedCard: SelectedCard) => {
    // 상품 목록과 당첨 확률
    const prizes = [
      { name: "웰컴드링크", probability: 12 },
      { name: "홍삼스틱", probability: 10 },
      { name: "상품권 1만원", probability: 5 },
      { name: "상품권 3만원", probability: 2 },
      { name: "상품권 5만원", probability: 1 },
      { name: "음료수", probability: 10 },
      { name: "꽝", probability: 45 },
      { name: "표고와사비", probability: 10 },
      { name: "사케 300ml", probability: 5 }
    ];

    // 확률에 따른 추첨
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedPrize = "꽝";
    
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        selectedPrize = prize.name;
        break;
      }
    }

    const isWin = selectedPrize !== "꽝";

    const result: GameResult = {
      cardNumber,
      selectedCard,
      prize: selectedPrize,
      isWin
    };

    setGameResult(result);
    nextScene();
  };

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene1 onStart={nextScene} />;
      case 2:
        return <Scene2 onCardSelect={handleCardSelect} />;
      case 3:
        return <Scene3 onComplete={nextScene} result={gameResult} />;
              case 4:
          return <Scene4 result={gameResult} onNext={nextScene} onReset={resetGame} />;
        case 5:
          return <Scene5 result={gameResult} onReset={resetGame} />;
      default:
        return <Scene1 onStart={nextScene} />;
    }
  };

  return (
    <div className="App">
      {renderScene()}
    </div>
  );
}

export default App;
