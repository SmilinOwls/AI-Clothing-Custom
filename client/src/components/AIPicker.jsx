import React, { useState, useRef } from 'react'
import CustomButton from './CustomButton';

function AIPicker({ generatingImg, handleDecal }) {
  const url = 'http://localhost:5000/api/v1/dalle';
  const selectedType = useRef("");
  const [prompt, setPrompt] = useState("");
  let controller;

  const fetchPhoto = async (type, prompt) => {
    controller = new AbortController();
    const signal = controller.signal;
    try{
      const response = await fetch(url, { 
        method: 'POST',
        signal: signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
        })
      });

      const data = await response.json();
      console.log(data);
      handleDecal(type, `data:image/png;base64,${data.photo}`);
    }
    catch(err) {
      console.error(`Photo error: ${err.messgae}`);
    } finally {

    }

  };

  const handleSumbit = (type) => {
    if(!prompt) return alert('Please enter a prompt!');
    
    if(type === "reset") {
      setPrompt("");

      // Apply the AI-generated photo aborted
      if(controller){
        controller.abort();
      }
      return;
    }
    
    fetchPhoto(type, prompt);

  };

  return (
    <div className='aipicker-container'>
      <textarea
        className='aipicker-textarea'
        placeholder='Ask AI...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-1 flex-col gap-3'>
        <div className='mt-2'>
          <select defaultValue="logo" ref={selectedType} className="select-container">
            <option value="logo">Logo</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div className='mt-3 text-sm flex gap-2'>
          <CustomButton
            type="outline"
            content="Reset"
            handleClick={() => handleSumbit('reset')}
          />
          <CustomButton
            type="filled"
            content="Apply"
            handleClick={() => handleSumbit('apply')}
          />
        </div>

      </div>
    </div>
  )
}

export default AIPicker