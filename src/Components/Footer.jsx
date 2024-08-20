import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <div className='absolute bottom-0 justify-center w-full bg-[#63_e] border-t-4 text-white border-purple-400 h-[5%] flex items-center text-lg font-work'><p className='flex'>Created by - <span className='hover:text-blue-200 px-2 flex gap-1 items-center'> <FaGithub /> <a target="_blank" href="https://github.com/Yoriichi47"> Yoriichi_47</a></span></p></div>
    </>
  )
}

export default Footer