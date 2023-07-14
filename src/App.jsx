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
    default:
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
            You set out on your travels optimistic, enthusiastic for your royal
            duties. The journey is a treacherous one, following the map given to
            you by the royal scribe. As the weeks pass you grow weary and doubt
            begins to plague your mind. Many times you become lost, and it
            becomes apparent that you might never make the journey. Just as hope
            starts to wane you finally see the castle emerge on the horizon. You
            follow the trail that leads up to the entrance.
          </Paragraph>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    case 2:
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
