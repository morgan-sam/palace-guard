import BackStory from "components/BackStory";
import Game from "components/Game";
import Button from "components/Button";
import NavButtons from "components/NavButtons";
import emblem from "images/emblem.png";

const CurrentScreen = ({ screenID, setScreenID, images }) => {
  switch (screenID) {
    default:
    case 0:
      return (
        <>
          <img src={emblem} alt="castle" className="h-1/2 mx-auto" />
          <h1 className="p-8 text-6xl md:text-8xl">Palace Guard</h1>
          <NavButtons {...{ screenID, setScreenID }} />
        </>
      );
    case 1:
      return (
        <BackStory image={images["letter"]} {...{ screenID, setScreenID }}>
          You are a courier who has been given a contract by the local guild to
          deliver a letter to the king. The contents of which you have no idea,
          but you are under strict orders not to open it. The guild master
          reiterates the utmost urgency it is placed in the king's (and only the
          king's) hands before depart on your journey.
        </BackStory>
      );
    case 2:
      return (
        <BackStory image={images["castle"]} {...{ screenID, setScreenID }}>
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
    case 3:
      return (
        <BackStory image={images["gates"]} {...{ screenID, setScreenID }}>
          As you approach the gates you see several guards standing watch. They
          eye you suspiciously. You walk carefully towards them, not to agitate
          them. Several archers line the walls with weapons drawn. You raise
          your hands to show yourself as a non-threat. One of the guards walks
          towards you and begins to speak...
        </BackStory>
      );
    case 4:
      return <Game {...{ setScreenID, images }} />;
    case "lose":
      return (
        <>
          <h1 className="p-8 text-6xl md:text-8xl">You Lose!</h1>
          <Button
            className="mx-auto mb-4"
            onClick={() => setScreenID(0)}
            text={"Game Over"}
          ></Button>
        </>
      );
    case "win":
      return (
        <>
          <h1 className="p-8 text-6xl md:text-8xl">You Win!</h1>
          <Button
            className="mx-auto mb-4"
            onClick={() => setScreenID(0)}
            text={"Game Over"}
          ></Button>
        </>
      );
  }
};

export default CurrentScreen;