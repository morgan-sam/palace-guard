import Button from "components/Button";

const NavigationButtons = ({ screenID, setScreenID }) => {
  return (
    <div className="border-double border-4 border-black bg-white w-fit">
      {screenID > 0 && (
        <Button text="Previous" onClick={() => setScreenID(screenID - 1)} />
      )}
      <Button
        text={screenID > 0 ? "Next" : "Start"}
        onClick={() => setScreenID(screenID + 1)}
      />
    </div>
  );
};

export default NavigationButtons;
