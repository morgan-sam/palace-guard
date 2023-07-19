import NavButtons from "components/NavButtons";
import Paragraph from "components/Paragraph";

const BackStory = ({ children, image, screenID, setScreenID }) => {
  return (
    <div
      className="grid w-full h-full gap-y-2 max-w-xl"
      style={{
        gridTemplateRows: "minmax(50%, 1fr) auto auto",
        gridAutoRows: "minmax(0, max-content)",
      }}
    >
      <img
        src={image}
        alt="castle"
        className="max-h-full m-auto w-full border-double border-b-[6px] border-black"
      />
      <Paragraph className="h-full overflow-y-scroll mx-auto p-2">
        {children}
      </Paragraph>
      <NavButtons className="mx-auto mb-4" {...{ screenID, setScreenID }} />
    </div>
  );
};

export default BackStory;
