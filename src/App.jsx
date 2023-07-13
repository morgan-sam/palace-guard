import "App.css";
import MenuButton from "components/MenuButton";
import NavigationButtons from "components/NavigationButtons";
import { useState } from "react";

function App() {
  const [screenID, setScreenID] = useState(0);
  let currentScreen = null;
  switch (screenID) {
    case 0:
      currentScreen = (
        <>
          <NavigationButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    case 1:
      currentScreen = (
        <>
          screen2
          <NavigationButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    default:
      currentScreen = (
        <>
          <NavigationButtons {...{ screenID, setScreenID }} />
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
