import React from 'react'

function OverlaySearch() {
  return (
    <div className='flex'>
        <div className='w-full'>
            <input className='bg-orange-500 w-[80%]' type="text" placeholder='enter an address, property type or price' />
        </div>
        <div>
            <button>search</button>
        </div>
        
    </div>
  )
}

export default OverlaySearch