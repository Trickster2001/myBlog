import React, { forwardRef, useId } from 'react'

const Select = ({label, options=[], className="", ...props}, ref) => {
  const id = useId();
  return (
    <div className='mb-4'>
      {label && <label htmlFor={id} className="mr-3">{label}</label>}
      <select className='px-4 py-1' {...props} id={id} ref={ref}>
        {options?.map((option) => (
          <option  key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Select)