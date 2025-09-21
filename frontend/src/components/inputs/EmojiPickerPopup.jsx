import React from 'react';
import { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage , LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon , onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <div className='w-12 h-12 flex items-center justify-center text-2xl text-primary bg-purple-50 rounded-lg'>
            {icon ? <img src={icon} alt='icon' className='w-12 h-12' /> : <LuImage />}
        </div>

        <p>{icon ? 'Change' : 'Add'}</p>
      </div>
      {isOpen && (
          <div className='relative'>
            <button className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={() => setIsOpen(false)}><LuX/></button>

            <EmojiPicker open={isOpen} onEmojiClick={(emoji) => onSelect(emoji.imageUrl || "")}/>
          </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup
