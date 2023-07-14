import "App.css";
import ButtonContainer from "components/ButtonContainer";
import MenuButton from "components/MenuButton";
import NavButtons from "components/NavButtons";
import { useState } from "react";
import castle1 from "images/castle/1.jpg";
import Paragraph from "components/Paragraph";

function App() {
  const [screenID, setScreenID] = useState(0);
  let currentScreen = null;
  switch (screenID) {
    case 0:
      currentScreen = (
        <>
          <ButtonContainer>
            <MenuButton text={"Start"} onClick={() => setScreenID(1)} />
          </ButtonContainer>
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
          <Paragraph>
            I understand your enthusiasm, but I must adhere to the rules and
            regulations. Unauthorized access to the king is strictly prohibited.
            I appreciate your understanding in this matter. Is there anything
            else I can assist you with?
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
