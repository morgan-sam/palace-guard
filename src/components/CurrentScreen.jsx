import Story from "components/Story";
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
        <Story image={images["letter"]} {...{ screenID, setScreenID }}>
          You are a courier who has been given a contract by the local guild to
          deliver a letter to the king. The contents of which you have no idea,
          but you are under strict orders not to open it. The guild master
          reiterates the utmost urgency it is placed in the king's (and only the
          king's) hands before depart on your journey.
        </Story>
      );
    case 2:
      return (
        <Story image={images["castle"]} {...{ screenID, setScreenID }}>
          You set out on your travels optimistic, enthusiastic for your royal
          duties. The journey is a treacherous one, following the map given to
          you by the royal scribe. As the weeks pass you grow weary and doubt
          begins to plague your mind. Many times you become lost, and it becomes
          apparent that you might never make the journey. Just as hope starts to
          wane you finally see the castle emerge on the horizon.
          <br />
          <br />
          You follow the trail that leads up to the entrance.
        </Story>
      );
    case 3:
      return (
        <Story image={images["gates"]} {...{ screenID, setScreenID }}>
          As you approach the gates you see several guards standing watch. They
          eye you suspiciously. You walk carefully towards them, not to agitate
          them. Several archers line the walls with weapons drawn. You raise
          your hands to show yourself as a non-threat. One of the guards walks
          towards you and begins to speak...
        </Story>
      );
    case 4:
      return <Game {...{ setScreenID, images }} />;
    case "lose":
      return (
        <Story image={images["dungeon"]} {...{ screenID, setScreenID }}>
          You are cast in the the castle dungeon where you spend the rest of
          your days. Your diet consists of stale bread and other foul scraps,
          your days consist of nothing.
          <br />
          <br />
          You never find out what the contents of the letter were, although it
          consumes your mind daily. That is, until the malnutrition starts to
          atrophy your brain, and your conscience slowly fades to black.
          <h1 className="p-8 text-6xl md:text-8xl">You Lose!</h1>
        </Story>
      );
    case "win":
      return (
        <Story image={images["king"]} {...{ screenID, setScreenID }}>
          The guard ushers you through the gate into the courtyard, and are then
          directed through a padlocked wooden door he unlocks. You walk along a
          long, dark stone hallway. Eventually you reach an opening dimly lit by
          two torches. You pass through...
          <br />
          <br />
          As you enter the main hall of the castle and look around. Huge ornate
          tapestries line the walls next to giant imposing pillars. The room is
          entirely devoid of life, apart from a single shadowy figure sitting in
          the giant throne at the end of the hall.
          <br />
          <br />
          You walk up the the king in complete silence, except for your
          footsteps reverberating around the room. As you get closer you here a
          faint groaning noise coming from the figure. You walk closer...
          <br />
          <br />
          As your draw in you realize the king is fast asleep in his throne,
          quietly snoring. You pause for a moment, and consider if you should
          wake him up. Remembering the guard's threats you decide against it and
          instead tuck the letter in the cusp of his hands.
          <br />
          <br />
          You hastily walk out of the castle and thank the guard on your way
          out. You set back down the trail and disappear into the night.
          <h1 className="p-8 text-6xl md:text-8xl">You Win!</h1>
        </Story>
      );
  }
};

export default CurrentScreen;
