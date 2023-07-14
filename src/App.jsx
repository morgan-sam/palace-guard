import "App.css";
import BackStory from "components/BackStory";
import DialogueBox from "components/DialogueBox";
import NavButtons from "components/NavButtons";
import { useState } from "react";
import castle1 from "images/castle/1.jpg";
import guards1 from "images/guards/1.jpg";

function App() {
  const [screenID, setScreenID] = useState(0);
  let currentScreen = null;
  switch (screenID) {
    default:
    case 0:
      currentScreen = (
        <>
          <h1>Palace Guard</h1>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    case 1:
      currentScreen = (
        <BackStory image={castle1} {...{ screenID, setScreenID }}>
          You set out on your travels optimistic, enthusiastic for your royal
          duties. The journey is a treacherous one, following the map given to
          you by the royal scribe. As the weeks pass you grow weary and doubt
          begins to plague your mind. Many times you become lost, and it becomes
          apparent that you might never make the journey. Just as hope starts to
          wane you finally see the castle emerge on the horizon. You follow the
          trail that leads up to the entrance.
        </BackStory>
      );
      break;
    case 2:
      currentScreen = (
        <BackStory image={guards1} {...{ screenID, setScreenID }}>
          As you approach the gates you see several guards standing watch. They
          eye you suspiciously. You walk carefully towards them, not to agitate
          them. Several archers line the walls with weapons drawn. You raise
          your hands to show yourself as a non-threat. One of the guards walks
          towards you and begins to speak...
        </BackStory>
      );
      break;
    case 3:
      currentScreen = (
        <>
          <DialogueBox />
        </>
      );
      break;
  }

  return (
    <div className="App">
      {screenID}
      <div
        id="game-container"
        className="max-h-[75%] max-w-3/4 border-double border-8 border-black bg-white flex items-center	justify-center flex-col p-4 box-content"
      >
        {currentScreen}
      </div>
    </div>
  );
}

export default App;
