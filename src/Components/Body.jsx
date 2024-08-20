import React from 'react'
import Header from './Header'
// import Window from './Window'

const Body = () => {
  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-cyan-200 [background:radial-gradient(125%_125%_at_50%_10%,pink_20%,#63e_100%)]">
        <div className='container m-auto xl:w-1/2'>
        <Header />
        </div>
      </div>
    </div>
  )
}

export default Body