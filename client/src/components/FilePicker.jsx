import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import CustomButton from './CustomButton';
import state from '../store';
import { reader } from '../config/helpers';

function FilePicker({ handleDecal }) {
  const [file, setFile] = useState("");
  const selectedType = useRef("");

  const readFile = (action) => {
    const type = action === "reset" ? "none" : action === "apply" ? selectedType.current.value : null;
    reader(file).then(
      (result) => {
        handleDecal(type, result);
      }
    ).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>
        <label htmlFor='file-upload' className='filepicker-label'>Upload File</label>
        <input
          type="file"
          id="file-upload"
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className='mt-2 text-gray-600 border-neutral-300 rounded-md border h-full p-2 text-base truncate'>
          {file.length === 0 ? "No file selected" : file.name}
        </div>
        <div className='mt-2'>
          <select defaultValue="logo" ref={selectedType} className="py-2 px-3 text-sm bg-gray-300 text-gray-700 cursor-pointer rounded-md">
            <option value="logo">Logo</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div className='mt-3 text-sm flex gap-2'>
          <CustomButton
            type="outline"
            content="Reset"
            handleClick={() => readFile('reset')}
          />
          <CustomButton
            type="filled"
            content="Apply"
            handleClick={() => readFile('apply')}
          />
        </div>
      </div>
    </div>
  )
}

export default FilePicker