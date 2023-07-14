import { useState } from "react";
import Paragraph from "components/Paragraph";
import face_a1 from "images/faces/a1.jpg";
import face_a2 from "images/faces/a2.jpg";
import face_a3 from "images/faces/a3.jpg";
import face_a4 from "images/faces/a4.jpg";
import face_a5 from "images/faces/a5.jpg";

import Chatbot from "./Chatbot";

const DialogueBox = () => {
  return (
    <div className="flex">
      <img src={face_a3} alt="castle" className="h-80 w-80 mr-4" />
      <Chatbot />
    </div>
  );
};

export default DialogueBox;
