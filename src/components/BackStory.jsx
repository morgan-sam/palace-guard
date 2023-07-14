import NavButtons from "components/NavButtons";
import Paragraph from "components/Paragraph";

const BackStory = ({ children, image, screenID, setScreenID }) => {
  return (
    <div
      className="grid w-full h-full gap-y-2"
      style={{
        gridTemplateRows: "minmax(50%, 1fr) auto auto",
        gridAutoRows: "minmax(0, max-content)",
      }}
    >
      <img src={image} alt="castle" className="h-full mx-auto" />
      <Paragraph className="h-full overflow-y-scroll mx-auto">
        {children}
      </Paragraph>
      <NavButtons className="mx-auto" {...{ screenID, setScreenID }} />
    </div>
  );
};

export default BackStory;
