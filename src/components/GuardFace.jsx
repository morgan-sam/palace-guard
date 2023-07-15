import { useState } from "react";

import face_a1 from "images/faces/a1.jpg";
import face_a2 from "images/faces/a2.jpg";
import face_a3 from "images/faces/a3.jpg";
import face_a4 from "images/faces/a4.jpg";
import face_a5 from "images/faces/a5.jpg";

const GuardFace = ({ disposition }) => {
  let currentFace = null;
  if (disposition < 20) currentFace = face_a1;
  else if (disposition < 40) currentFace = face_a2;
  else if (disposition < 60) currentFace = face_a3;
  else if (disposition < 80) currentFace = face_a4;
  else currentFace = face_a5;
  return (
    <img
      src={currentFace}
      alt="castle"
      className="h-full mx-auto object-contain"
    />
  );
};

export default GuardFace;
