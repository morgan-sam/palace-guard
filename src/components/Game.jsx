import { useState, useEffect } from "react";
import Paragraph from "components/Paragraph";
import Button from "components/Button";
import { initialPrompt } from "data";
import GuardFace from "components/GuardFace";
import IntervalString from "components/IntervalString";
import Disposition from "components/Disposition";

import firebaseApp from "config/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const Game = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: initialPrompt },
  ]);
  const [dialogue, setDialogue] = useState(null);
  const [disposition, setDisposition] = useState(50);
  const [loading, setLoading] = useState(false);

  const addToDialogue = (newDialogue, speakerName) => {
    setDialogue((prev) => {
      return (
        <>
          {prev}
          <Paragraph>
            {speakerName}: {newDialogue}
          </Paragraph>
        </>
      );
    });
  };

  const handleReply = (reply) => {
    const newDisposition = getDisposition(reply);
    setDisposition(newDisposition);
    reply = reply.replace(`[${newDisposition}]`, "");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: reply,
      },
    ]);
    addToDialogue(reply, "Guard");
  };

  const getDisposition = (replyString) => {
    const regex = /\[(\d+)\]/g;
    let newDisposition = replyString.match(regex)?.[0];
    if (newDisposition) {
      // Manipulate the extracted value
      newDisposition = newDisposition.replace("[", "").replace("]", "");
    } else {
      // If extraction fails or value not found, use the old disposition value
      newDisposition = disposition;
    }
    return newDisposition;
  };

  async function sendMessage() {
    setLoading(true);
    if (prompt) addToDialogue(prompt, "Courier");
    try {
      const functions = getFunctions(firebaseApp);
      const sendMessagesFunction = httpsCallable(functions, "sendMessages");
      const response = await sendMessagesFunction({ messages });
      // console.log(response.data.message);
      handleReply(response.data.message);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      grid-cols-[1fr] grid-rows-[1fr_auto_1fr_1fr]
      md:grid-cols-[minmax(50%,_1fr)_minmax(50%,_1fr)] grid-rows-[1fr_auto]
      ${borderString}`}
    >
      <GuardFace {...{ disposition }} className={`${borderString}`} />
      <div
        className={`flex flex-col items-start text-left max-h-full overflow-y-scroll px-2 ${borderString}`}
      >
        {dialogue}
      </div>
      <Disposition
        {...{ disposition }}
        className={`text-3xl flex justify-center items-center ${borderString}`}
      />
      <form onSubmit={handleSubmit} className={`flex h-15 p-1 ${borderString}`}>
        <div className="border-double border-4 border-black bg-white w-full m-0">
          <textarea
            onKeyDown={textAreaEnterPress}
            style={{ resize: "none" }}
            className="border-double border-4 border-black bg-white w-full h-full p-1 leading-3 m-0 disabled:bg-gray-200 disabled:cursor-not-allowed"
            type="text"
            value={prompt}
            placeholder={loading ? "" : "Enter your dialogue here."}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>
        <div className="border-double border-4 border-black bg-white w-fit h-fit">
          <Button
            className="w-24	disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
            text={loading ? <IntervalString /> : "Speak"}
          />
        </div>
      </form>
    </div>
  );
};

export default Game;
