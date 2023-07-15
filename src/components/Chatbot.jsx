import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import Paragraph from "./Paragraph";
import Button from "./Button";
import face_a3 from "images/faces/a3.jpg";
import { initialPrompt } from "data";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
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
    const newDisposition = replyString
      .match(regex)[0]
      .replace("[", "")
      .replace("]", "");
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
      alert("Something is going wrong, Please try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      sendMessage();
    }
  }, [messages]);

  useEffect(() => {
    // first time load
    sendMessage();
  }, []);

  return (
    <div
      className="grid max-h-full h-full max-w-xl max-h-[22rem]"
      style={{
        gridTemplateColumns: "minmax(50%, 1fr) minmax(50%, 1fr)",
        gridAutoRows: "minmax(0, max-content)",
      }}
    >
      <img
        src={face_a3}
        alt="castle"
        className="h-full mx-auto object-contain"
      />
      <div className="flex flex-col items-start text-left max-h-full overflow-y-scroll ml-2 mb-2">
        {dialogue}
      </div>
      <h3 className="text-3xl flex justify-center items-center">
        Disposition: {disposition}
      </h3>
      <form onSubmit={handleSubmit} className="flex h-15">
        <div className="border-double border-4 border-black bg-white w-full m-0">
          <textarea
            style={{ resize: "none" }}
            className="border-double border-4 border-black bg-white w-full h-full p-1 leading-3 m-0"
            type="text"
            value={prompt}
            placeholder="Enter your dialogue here."
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>
        <div className="border-double border-4 border-black bg-white w-fit h-fit">
          <Button
            disabled={loading || prompt.length === 0}
            type="submit"
            text={loading ? "Generating..." : "Speak"}
          />
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
