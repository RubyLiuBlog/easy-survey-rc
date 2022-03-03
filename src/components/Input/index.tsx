import React from 'react'

interface InputProps {
  value?:string
}
const Input:React.FC<InputProps> = (props) => {
  const { value } = props
  return (
    <input value={value} />
  )
}

export default Input
