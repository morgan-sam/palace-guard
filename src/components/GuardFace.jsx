const GuardFace = ({ className, disposition, images }) => {
  let currentFace = images["guard"][2];
  if (disposition < 20) currentFace = images["guard"][0];
  else if (disposition < 40) currentFace = images["guard"][1];
  else if (disposition < 60) currentFace = images["guard"][2];
  else if (disposition < 80) currentFace = images["guard"][3];
  else currentFace = images["guard"][4];
  return (
    <img
      src={currentFace}
      alt="castle"
      className={`max-h-80 md:max-h-full h-auto w-full mx-auto object-contain ${className}`}
    />
  );
};

export default GuardFace;
