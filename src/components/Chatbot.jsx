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
  const [loading, setLoading] = useState(false);

  const addToDialogue = (newDialogue) => {
    setDialogue((prev) => {
      return (
        <>
          {prev}
          <Paragraph>Courier: {prompt}</Paragraph>
          <Paragraph>{newDialogue}</Paragraph>
        </>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
  };

  async function firstTimeLoad() {
    setLoading(true);
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });
      const intialDialogue = response.data.choices[0].message.content;
      setDialogue(<Paragraph>{intialDialogue}</Paragraph>);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: intialDialogue },
      ]);
    } catch (e) {
      alert("Something is going wrong, Please try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    firstTimeLoad();
  }, []);

  async function sendMessage() {
    setLoading(true);
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.choices[0].message.content,
        },
      ]);
      addToDialogue(response.data.choices[0].message.content);
    } catch (e) {
      alert("Something is going wrong, Please try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log(messages);
    if (messages[messages.length - 1].role === "user") {
      sendMessage();
    }
  }, [messages]);

  return (
    <div
      className="grid max-h-full h-full max-w-xl"
      style={{
        gridTemplateColumns: "minmax(50%, 1fr) auto",
        gridAutoRows: "minmax(0, max-content)",
      }}
    >
      <img src={face_a3} alt="castle" className="h-full mx-auto" />
      <div className="flex flex-col items-start text-left max-h-full overflow-y-scroll ml-2 mb-2">
        {dialogue}
      </div>
      <h3 className="text-3xl flex justify-center items-center">
        Disposition: 50
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
