import { useState, useEffect, useRef } from "react";

const Dialogue = ({
  className,
  newDialogue,
  speakerName,
  dialogueContainerRef,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [userScrolled, setUserScrolled] = useState(false);

  useEffect(() => {
    const dialogueArray = newDialogue.split("");
    dialogueArray.forEach((letter, index) => {
      setTimeout(() => {
        setDisplayedText((prev) => `${prev}${letter}`);
      }, 30 * index);
    });
  }, []);

  const onUserScroll = () => setUserScrolled(true);

  useEffect(() => {
    const dialogueContainer = document.querySelector("#dialogue-container");
    dialogueContainer.addEventListener("wheel", onUserScroll);
    return () => {
      dialogueContainer.removeEventListener("wheel", onUserScroll);
    };
  }, []);

  const scrollToBottom = () => {
    // Only scroll to the bottom if the user hasn't scrolled
    if (!userScrolled) {
      document.querySelector("#dialogue-container").scrollTo({
        top: document.querySelector("#dialogue-container").scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log(userScrolled);
    scrollToBottom();
  }, [displayedText]);

  return (
    <p className={`${className} text-xl md:text-2xl leading-nonebg-white`}>
      <span className="speaker">{speakerName}:&nbsp;</span>
      {displayedText && <span className="dialogue">{displayedText}</span>}
    </p>
  );
};

export default Dialogue;
