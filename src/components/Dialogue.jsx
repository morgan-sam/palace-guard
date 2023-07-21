import { useState, useEffect } from "react";

const Dialogue = ({ className, newDialogue, speakerName, setReplying }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [userScrolled, setUserScrolled] = useState(false);

  const typeOutGuardReply = (newDialogue) => {
    const dialogueArray = newDialogue.split("");
    dialogueArray.forEach((letter, index) => {
      setTimeout(() => {
        setDisplayedText((prev) => `${prev}${letter}`);
        if (index === dialogueArray.length - 1) setReplying(false);
      }, 30 * index);
    });
  };

  useEffect(() => {
    if (speakerName === "Courier") {
      setDisplayedText(newDialogue);
    } else {
      typeOutGuardReply(newDialogue);
    }
  }, []);

  const onUserScroll = () => setUserScrolled(true);

  useEffect(() => {
    const dialogueContainer = document.querySelector("#dialogue-container");
    dialogueContainer.addEventListener("wheel", onUserScroll);
    dialogueContainer.addEventListener("touchmove", onUserScroll);
    return () => {
      dialogueContainer.removeEventListener("wheel", onUserScroll);
      dialogueContainer.removeEventListener("touchmove", onUserScroll);
    };
  }, []);

  const scrollToBottom = () => {
    // Only scroll to the bottom if the user hasn't scrolled
    if (!userScrolled) {
      document.querySelector("#dialogue-container").scrollTo({
        top: document.querySelector("#dialogue-container").scrollHeight,
      });
    }
  };

  useEffect(() => {
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
