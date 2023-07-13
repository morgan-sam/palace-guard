import "App.css";
import MenuButton from "components/MenuButton";
import { useState } from "react";

function App() {
  const [screenID, setScreenID] = useState(0);
  let currentScreen = null;
  switch (screenID) {
    case 0:
      currentScreen = (
        <>
          <MenuButton text="Start" onClick={() => setScreenID(1)} />
        </>
      );
      break;
    case 1:
      currentScreen = (
        <>
          screen2
          <MenuButton text="Previous" onClick={() => setScreenID(0)} />
          <MenuButton text="Next" onClick={() => setScreenID(2)} />
        </>
      );
      break;
    default:
      currentScreen = (
        <>
          <MenuButton text="Previous" onClick={() => setScreenID(1)} />
          <p className="leading-none	bg-white">
            I understand your enthusiasm, but I must adhere to the rules and
            regulations. Unauthorized access to the king is strictly prohibited.
            I appreciate your understanding in this matter. Is there anything
            else I can assist you with?
          </p>
        </>
      );
      break;
  }

  return (
    <div className="App">
      {screenID}
      <div
        id="game-container"
        class="h-[75%] w-3/4 border-double border-8 border-black bg-white flex items-center	justify-center flex-col p-4"
      >
        {currentScreen}
      </div>
    </div>
  );
}

export default App;
