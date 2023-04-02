import "../components/StartScreen.css"
export default function StartScreen ({startGame}) {
    return (
        <div className="start">
            <h1>Palavra Secreta</h1>
            <p>Clique aqui para começar o jogo</p>
            <button onClick={startGame}>Começar o jogo</button>
        </div>
    )
}