import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
      {payload.map((item , index) => (
        <div className='flex items-center space-x-2' key={`legend-${index}`}>
            <div className='w-2.5 h-2.5 rounded-full' style={{backgroundColor : item.color}}></div>
            <span className='text-xs text-gray-700 font-medium'>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend
