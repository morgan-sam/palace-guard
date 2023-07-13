import "App.css";
import MenuButton from "components/MenuButton";

function App() {
  return (
    <div className="App">
      <div
        id="game-container"
        class="h-[75%] w-3/4 border-double border-8 border-black bg-white flex items-center	justify-center flex-col p-4"
      >
        <MenuButton text="Start" />
        <p className="leading-none	bg-white">
          I understand your enthusiasm, but I must adhere to the rules and
          regulations. Unauthorized access to the king is strictly prohibited. I
          appreciate your understanding in this matter. Is there anything else I
          can assist you with?
        </p>
      </div>
    </div>
  );
}

export default App;
