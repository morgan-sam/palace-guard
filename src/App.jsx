import "App.css";
import ButtonContainer from "components/ButtonContainer";
import DialogueBox from "components/DialogueBox";
import NavButtons from "components/NavButtons";
import { useState } from "react";
import castle1 from "images/castle/1.jpg";
import Paragraph from "components/Paragraph";
import guards1 from "images/guards/1.jpg";

function App() {
  const [screenID, setScreenID] = useState(13);
  let currentScreen = null;
  switch (screenID) {
    default:
      currentScreen = (
        <div
          className="grid w-full h-full gap-y-2"
          style={{
            gridTemplateRows: "minmax(0, 50%) minmax(0, 1fr) auto",
            gridAutoRows: "minmax(0, max-content)",
          }}
        >
          <img src={castle1} alt="castle" className="h-full mx-auto	" />
          <Paragraph className="h-full overflow-y-scroll mx-auto	">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis
            vestibulum orci eu iaculis. Donec tempus ultricies massa eu
            consequat. Cras vehicula lectus a condimentum vehicula. In nec metus
            consequat, euismod mi quis, ullamcorper nulla. Vestibulum nulla
            nunc, blandit tempor turpis a, fermentum suscipit massa. Praesent id
            rhoncus mauris. Pellentesque id dui vitae magna facilisis egestas.
            Cras placerat eros enim, quis interdum risus sodales et. Duis
            ultrices tellus sem, id ullamcorper arcu condimentum eu. Vivamus
            felis massa, porta non efficitur a, suscipit id ligula. Quisque
            feugiat leo turpis, auctor tempor augue molestie eget. Vestibulum ut
            suscipit est. Curabitur interdum in nunc eget ullamcorper. In hac
            habitasse platea dictumst. Nulla sapien felis, suscipit in dui id,
            consectetur eleifend nulla. Aenean non tincidunt nisl, sed placerat
            lacus. Donec viverra dictum fermentum. Nunc ut suscipit eros. Nulla
            bibendum sem vel congue ultricies. Suspendisse scelerisque diam sit
            amet metus interdum, id fringilla urna vulputate. Phasellus
            condimentum, tortor non interdum varius, lorem mi vulputate ligula,
            eu iaculis tellus turpis non mi. In et lectus eu urna egestas
            commodo non eu libero. Praesent bibendum lacus mauris, vel
            vestibulum lectus tristique in. Vivamus condimentum libero enim.
            Quisque efficitur mattis tortor non varius. Integer eleifend a
            tellus ut posuere.
          </Paragraph>
          <NavButtons className="mx-auto" {...{ screenID, setScreenID }} />
        </div>
      );
      break;
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
          <img src={castle1} alt="castle" className="h-full w-full" />
          <Paragraph className="h-full w-full my-2">
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
          <img src={guards1} alt="guards" className="h-full w-full" />
          <Paragraph className="h-full w-full my-2">
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
        className="h-[75%] w-3/4 border-double border-8 border-black bg-white flex items-center	justify-center flex-col p-4 box-content"
      >
        {currentScreen}
      </div>
    </div>
  );
}

export default App;
