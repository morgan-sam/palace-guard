import Button from "components/Button";
import NavButtons from "components/NavButtons";
import Paragraph from "components/Paragraph";

const Story = ({ children, image, screenID, setScreenID }) => {
  return (
    <div className="grid w-full h-full gap-y-2 max-w-xl grid-rows-[minmax(30%,_auto)_auto_auto]">
      <div>
        <img
          src={image}
          alt="castle"
          className="max-h-full m-auto w-full border-double border-b-[6px] border-black"
        />
      </div>
      <Paragraph className="h-full overflow-y-scroll mx-auto p-2">
        {children}
      </Paragraph>
      {Number.isInteger(screenID) ? (
        <NavButtons className="mx-auto mb-4" {...{ screenID, setScreenID }} />
      ) : (
        <Button text={"Game Over"} onClick={() => setScreenID(0)} />
      )}
    </div>
  );
};

export default Story;
