import MenuButton from "components/MenuButton";

const NavigationButtons = ({ screenID, setScreenID }) => {
  return (
    <div className="border-double border-8 border-black bg-white w-fit">
      {screenID > 0 && (
        <MenuButton text="Previous" onClick={() => setScreenID(screenID - 1)} />
      )}
      <MenuButton
        text={screenID > 0 ? "Next" : "Start"}
        onClick={() => setScreenID(screenID + 1)}
      />
    </div>
  );
};

export default NavigationButtons;
