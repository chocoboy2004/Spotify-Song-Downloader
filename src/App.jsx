import React, { useState } from 'react'
import axios from 'axios'
import { FaSpotify } from "react-icons/fa6"
import { rapidapiKey, rapidapiHost } from '../index.js'

const App = () => {
  const [URL, setURL] = useState("")
  const [image, setImage] = useState("")

  const takeURL = (e) => {
    e.preventDefault()
    setURL(e.target.value)
  }

  console.log(URL)

  const downloadSong = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': rapidapiKey,
        'x-rapidapi-host': rapidapiHost,
        "content-type": "application/json"
      }
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data.data.downloadLink);
      setURL("")
      setImage("https://media.tenor.com/kX6rKltb7isAAAAe/kadak-hai.png")

      window.location.href = response.data.data.downloadLink
    } catch (error) {
      console.error(error);
    }
  }

  // downloadSong()

  return (
    <div>
      <div className='h-screen w-screen flex items-center justify-center flex-col gap-y-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
        <div className='flex items-center justify-center gap-x-2'>
          <FaSpotify size={55} />
          <p className='font-bold text-3xl'>Song Downloader</p>
        </div>

        <div className='flex items-center justify-center gap-x-2'>
          <input type="url" className='bg-slate-300 h-10 w-[400px] outline-none border border-slate-400 rounded-lg px-5 text-slate-700 shadow-2xl' value={URL} onChange={takeURL}/>
          <button className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white h-10 px-2 rounded-lg font-bold' onClick={downloadSong}>Download</button>

        </div>

        {
          image && (
            <img src={image} alt="" />
          )
        }
      </div>
    </div>
  )
}

export default App
