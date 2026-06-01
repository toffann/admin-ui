import React, { useState } from 'react';

function PostCard({ title, body }) {
  const [clicked, setClicked] = useState(false);

  return (

    <div className="flex flex-col bg-white p-3 rounded-md shadow-sm border border-transparent 
                    transition-all duration-300 hover:scale-105 hover:bg-pink-50 hover:border-gray-300 h-full">
      
      <h2 className="text-[11px] font-bold text-gray-800 text-center mb-1 leading-tight line-clamp-2">
        {title}
      </h2>

      <p className="text-gray-500 text-[10px] text-center flex-grow mb-3 leading-tight line-clamp-4">
        {body}
      </p>

      <button 
        onClick={() => setClicked(true)}
        className={`w-full py-1 rounded text-[10px] font-bold transition-colors text-white
          ${clicked ? "bg-special-red2" : "bg-gray-400"} 
          hover:brightness-110`}
      >        
        {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
      
    </div>
  );
}

export default PostCard;