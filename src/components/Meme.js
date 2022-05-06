import { useState, useEffect } from "react";
import "./Meme.css";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeData, setAllMemeData] = useState({});

  // Calling API
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemeData(data));
  }, []);

  function getMemeImage() {
    const memesArray = allMemeData.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    let memeSelected = memesArray[randomNumber];
    if (memeSelected.box_count === 2) {
      setMeme((prevState) => ({
        ...prevState,
        randomImage: memeSelected.url,
      }));
    } else {
      getMemeImage();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <main className='meme'>
      <div className='container'>
        <form onSubmit={submitHandler}>
          <div className='meme-inputs'>
            <input
              type='text'
              placeholder='Top text'
              className='form--input'
              onChange={handleChange}
              value={meme.topText}
              name='topText'
            />
            <input
              type='text'
              placeholder='Bottom text'
              className='form--input'
              onChange={handleChange}
              value={meme.bottomText}
              name='bottomText'
            />
          </div>
          <button className='form--button' onClick={getMemeImage}>
            Get a new meme image🖼️
          </button>
        </form>
        <div className='finished-meme'>
          <img src={meme.randomImage} className='meme-image' alt='' />
          <h2 className='meme--text top'>{meme.topText}</h2>
          <h2 className='meme--text bottom'>{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}

export default Meme;
