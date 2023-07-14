import NavButton from "components/NavButton";

const NavigationButtons = ({ screenID, setScreenID }) => {
  return (
    <div className="border-double border-4 border-black bg-white w-fit">
      {screenID > 0 && (
        <NavButton text="Previous" onClick={() => setScreenID(screenID - 1)} />
      )}
      <NavButton
        text={screenID > 0 ? "Next" : "Start"}
        onClick={() => setScreenID(screenID + 1)}
      />
    </div>
  );
};

export default NavigationButtons;
