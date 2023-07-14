import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Paragraph from "./Paragraph";
import Button from "./Button";

const Chatbot = () => {
  const configuration = new Configuration({
    organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [dialogue, setDialogue] = useState(
    <Paragraph>Guard: Halt! Who goes there?</Paragraph>
  );
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

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      addToDialogue(result.data.choices[0].message.content);
    } catch (e) {
      alert("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col max-w-[50%] justify-between ">
      <div className="flex flex-col items-start text-left">{dialogue}</div>
      <form onSubmit={handleSubmit} className="flex">
        <div className="border-double border-4 border-black bg-white w-full h-20 m-0">
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