import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu/menu";

const App = () => {
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null)); // Estado do tabuleiro
  const [winner, setWinner] = useState(null); // Armazenar o vencedor
  let winColor = "";

  if (winner === "X") {
    winColor = "Red";
  } else {
    winColor = "Blue";
  }

  // Função para verificar se alguém ganhou
  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6], // Diagonais
    ];

    // Verifica todas as combinações vencedoras
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Retorna o vencedor
      }
    }
    return null;
  };

  // Função para desenhar X ou O
  const desenhar = (item, index) => {
    if (board[index] || winner) return; // Não faz nada se já houver valor ou se já houver vencedor

    const newBoard = board.slice();
    const currentPlayer = turn % 2 !== 0 ? "X" : "O"; // Determina o jogador atual
    newBoard[index] = currentPlayer;

    // Atualiza o estado do tabuleiro
    setBoard(newBoard);

    // Verifica se há vencedor
    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner); // Define o vencedor
    } else {
      setTurn(turn + 1); // Alterna o turno
    }
  };

  return (
    <div className="App">
      <div className="Bg">
        <Menu turn={turn} />
        <div className="grid-3-3">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={(e) => desenhar(e, index)} // Passa o índice do botão para a função
              className="grid-item"
              disabled={cell !== null} // Desabilita o botão se já houver valor nele
            >
              {cell === "X" && <span className="crossRed">X</span>}
              {cell === "O" && <span className="circleBlue">O</span>}
            </button>
          ))}
        </div>

        {winner && <div className={`winner ${winColor}`}>{winColor} WON!</div>}
        {turn > 9 && !winner && <div class="winner">DRAW!</div>}
      </div>
    </div>
  );
};

export default App;
