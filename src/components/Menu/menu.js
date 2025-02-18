import "./menu.css";

const Menu = ({turn}) => {
  let turnAtual = "";

  if (turn % 2 !== 0) {
    turnAtual = "Red";
  } else {
    turnAtual = "Blue";
  }

  return (
    <div className="Menu">
      <div>Turn: {turn}</div>
      <div className={turnAtual}>{turnAtual}</div>
    </div>
  );
};

export { Menu };
