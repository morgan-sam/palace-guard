import { useState, useEffect, useRef } from "react";
import Dialogue from "components/Dialogue";
import Button from "components/Button";
import { initialPrompt } from "data";
import GuardFace from "components/GuardFace";
import IntervalString from "components/IntervalString";
import Disposition from "components/Disposition";

import firebaseApp from "config/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const Game = ({ setScreenID, images }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: initialPrompt },
  ]);
  const [disposition, setDisposition] = useState(50);
  const [replying, setReplying] = useState(false);
  const [dialogue, setDialogue] = useState([]);
  const [gameState, setGameState] = useState("playing");

  const addToDialogue = (newDialogue, speakerName) => {
    setDialogue((prev) => [
      ...prev,
      <Dialogue
        key={prev.length + 1}
        {...{ newDialogue, speakerName, setReplying }}
      />,
    ]);
  };

  const handleReply = (reply) => {
    const { speaker, message, disposition, state } = JSON.parse(reply);
    setDisposition(disposition);
    setGameState(state);
    addToDialogue(message, speaker);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: reply,
      },
    ]);
  };

  async function sendMessage() {
    setReplying(true);
    if (prompt) addToDialogue(prompt, "Courier");
    try {
      const functions = getFunctions(firebaseApp);
      const sendMessagesFunction = httpsCallable(functions, "sendMessages");
      const response = await sendMessagesFunction({ messages });
      handleReply(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      sendMessage();
      setPrompt("");
    }
  }, [messages]);

  useEffect(() => {
    // first time load
    sendMessage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
  };

  const textAreaEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    }
  };

  const borderString = "border-double border-[4px] border-black";

  return (
    <div
      className={`grid max-h-full h-full max-w-sm md:max-w-4xl max-h-[22rem] 
      grid-cols-[1fr] grid-rows-[1fr_1fr_auto_auto]
      md:grid-cols-[minmax(50%,_1fr)_minmax(50%,_1fr)] md:grid-rows-[1fr_auto]
      ${borderString}`}
    >
      <GuardFace {...{ disposition, images }} className={`${borderString}`} />
      <div
        id="dialogue-container"
        className={`flex flex-col items-start text-left max-h-full overflow-y-scroll px-2 ${borderString}`}
      >
        {dialogue.map((dialogueElement) => dialogueElement)}
      </div>
      <Disposition
        {...{ disposition }}
        className={`text-3xl flex justify-center items-center ${borderString}`}
      />
      {gameState === "playing" ? (
        <form
          onSubmit={handleSubmit}
          className={`flex h-15 p-1 ${borderString}`}
        >
          <div className="border-double border-4 border-black bg-white w-full m-0">
            <textarea
              onKeyDown={textAreaEnterPress}
              style={{ resize: "none" }}
              className="border-double border-4 border-black bg-white w-full h-full p-1 leading-3 m-0 disabled:bg-gray-200 disabled:cursor-not-allowed"
              type="text"
              value={prompt}
              placeholder={replying ? "" : "Enter your dialogue here."}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={replying}
            ></textarea>
          </div>
          <div className="border-double border-4 border-black bg-white w-fit h-fit">
            <Button
              className="w-24	disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={replying || prompt === ""}
              type="submit"
              text={replying ? <IntervalString /> : "Speak"}
            />
          </div>
        </form>
      ) : (
        <div className="m-auto border-double border-4 border-black bg-white w-fit h-fit">
          <Button
            className="w-24	disabled:bg-gray-200 disabled:cursor-not-allowed"
            type="submit"
            text={"Next"}
            onClick={() => setScreenID(gameState)}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
