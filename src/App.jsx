import "App.css";
import ButtonContainer from "components/ButtonContainer";
import MenuButton from "components/MenuButton";
import NavButtons from "components/NavButtons";
import { useState } from "react";
import castle1 from "images/castle/1.jpg";
import Paragraph from "components/Paragraph";
import guards1 from "images/guards/1.jpg";

function App() {
  const [screenID, setScreenID] = useState(0);
  let currentScreen = null;
  switch (screenID) {
    case 0:
      currentScreen = (
        <>
          <h1>Place Guard</h1>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    case 1:
      currentScreen = (
        <>
          <img src={castle1} alt="castle" className="h-1/2 w-1/2" />
          <Paragraph>
            You spend many weeks travelling to the castle. You finally see it
            emerge on the horizon.
          </Paragraph>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    default:
      currentScreen = (
        <>
          <img src={guards1} alt="guards" className="h-1/2 " />
          <Paragraph>
            As you approach the gates you see several guards standing watch.
            They eye you suspiciously. You walk carefully towards them, not to
            agitate them. Several archers line the walls with weapons drawn. You
            raise your hands to show yourself as a non-threat. One of the guards
            walks towards you and begins to speak...
          </Paragraph>
          <NavButtons {...{ screenID, setScreenID }} />
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
