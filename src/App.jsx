import "App.css";
import BackStory from "components/BackStory";
import Game from "components/Game";
import NavButtons from "components/NavButtons";
import { useState } from "react";
import pattern from "images/pattern/1.jpg";
import emblem from "images/emblem/3.png";
import letter1 from "images/letter/1.jpg";
import castle1 from "images/castle/1.jpg";
import guards1 from "images/guards/1.jpg";

function App() {
  const [screenID, setScreenID] = useState(4);
  let currentScreen = null;
  switch (screenID) {
    default:
    case 0:
      currentScreen = (
        <>
          <img src={emblem} alt="castle" className="h-1/2 mx-auto" />
          <h1>Palace Guard</h1>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
      break;
    case 1:
      currentScreen = (
        <BackStory image={letter1} {...{ screenID, setScreenID }}>
          You are a courier who has been given a contract by the local guild to
          deliver a letter to the king. The contents of which you have no idea,
          but you are under strict orders not to open it. The guild master
          reiterates the utmost urgency it is placed in the king's (and only the
          king's) hands before depart on your journey.
        </BackStory>
      );
      break;
    case 2:
      currentScreen = (
        <BackStory image={castle1} {...{ screenID, setScreenID }}>
          You set out on your travels optimistic, enthusiastic for your royal
          duties. The journey is a treacherous one, following the map given to
          you by the royal scribe. As the weeks pass you grow weary and doubt
          begins to plague your mind. Many times you become lost, and it becomes
          apparent that you might never make the journey. Just as hope starts to
          wane you finally see the castle emerge on the horizon.
          <br />
          <br />
          You follow the trail that leads up to the entrance.
        </BackStory>
      );
      break;
    case 3:
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
    case 4:
      currentScreen = (
        <>
          <Game />
        </>
      );
      break;
  }

  return (
    <div className="App">
      {screenID}
      <div
        id="game-container"
        style={
          screenID == 0
            ? {
                backgroundRepeat: "repeat",
                background: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${pattern}) center/600px`,
              }
            : null
        }
        className="max-h-[75%] max-w-[75%] border-double border-8 border-black bg-white flex items-center	justify-center flex-col box-content"
      >
        {currentScreen}
      </div>
    </div>
  );
}

export default App;
