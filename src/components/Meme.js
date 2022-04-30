import { useState } from "react";
import "./Meme.css";
import memesData from "../memesData";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = useState(memesData);

  // to be removed
  var toBeRemoved = setAllMemeImages;
  console.log(toBeRemoved);
  // to be removed

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setMeme((prevState) => ({
      ...prevState,
      randomImage: memesArray[randomNumber].url,
    }));
  }
  return (
    <main className='meme'>
      <div className='container'>
        <form>
          <div className='meme-inputs'>
            <input type='text' />
            <input type='text' />
          </div>
          <div className='submit' onClick={getMemeImage}>
            Get a new meme image🖼️
          </div>
        </form>
        <img className='meme-image' src={meme.randomImage} alt='' />
      </div>
    </main>
  );
}

export default Meme;
