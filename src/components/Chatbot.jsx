import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { initialPrompt } from "data";
import GuardFace from "./GuardFace";
import IntervalString from "./IntervalString";

const Chatbot = () => {
  const configuration = new Configuration({
    organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: initialPrompt },
  ]);
  const [dialogue, setDialogue] = useState(null);
  const [disposition, setDisposition] = useState(50);
  const [loading, setLoading] = useState(false);

  const addToDialogue = (newDialogue) => {
    setDialogue((prev) => {
      return (
        <>
          {prev}
          {prompt && <Paragraph>Courier: {prompt}</Paragraph>}
          <Paragraph>Guard: {newDialogue}</Paragraph>
        </>
      );
    });
  };

  const handleReply = (response) => {
    let reply = response.data.choices[0].message.content;
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
    addToDialogue(reply);
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
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });
      handleReply(response);
    } catch (e) {
      console.log(e);
      alert("Something is going wrong, Please try again.");
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

  return (
    <div
      className="grid max-h-full h-full max-w-xl max-h-[22rem]"
      style={{
        gridTemplateColumns: "minmax(50%, 1fr) minmax(50%, 1fr)",
        gridAutoRows: "minmax(0, max-content)",
      }}
    >
      <GuardFace {...{ disposition }} />
      <div className="flex flex-col items-start text-left max-h-full overflow-y-scroll ml-2 mb-2">
        {dialogue}
      </div>
      <h3 className="text-3xl flex justify-center items-center">
        <span className="font-['Heritage-Display']">Disposition:&nbsp;</span>
        <span className="font-['Heritage-Display']">{disposition}</span>
      </h3>
      <form onSubmit={handleSubmit} className="flex h-15">
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

export default Chatbot;
