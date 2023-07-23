import "App.css";
import { useEffect, useState } from "react";
import CurrentScreen from "components/CurrentScreen";
import IntervalString from "components/IntervalString";
import { getGameImages } from "data";
import pattern from "images/pattern.jpg";

function App() {
  const [screenID, setScreenID] = useState(0);
  const [images, setImages] = useState({});

  useEffect(() => {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }
    const imagesObject = importAll(
      require.context("./images", false, /\.(png|jpe?g|svg)$/)
    );
    const newImages = getGameImages(imagesObject);
    setImages(newImages);
  }, []);

  return (
    <div className="App">
      {Object.keys(images).length === 0 ? (
        <h2 className="flex flex-row text-2xl">
          <span>Loading</span>
          <IntervalString />
        </h2>
      ) : (
        <div
          id="game-container"
          style={
            screenID == 0
              ? {
                  backgroundRepeat: "repeat",
                  background: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${pattern}) center/600px`,
                }
              : null
          }
          className="max-h-[75%] max-w-[75%] border-double border-8 border-black bg-white flex items-center	justify-center flex-col box-content"
        >
          <CurrentScreen {...{ screenID, setScreenID, images }} />
        </div>
      )}
    </div>
  );
}

export default App;
