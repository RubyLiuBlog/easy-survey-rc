import React, { useEffect, useState } from 'react'
import classnames from 'classnames'


export type inputType = 'number' | 'text' | 'textArea' | 'dateTime'
interface InputProps {
  defaultValue?: string | number;
  value?:string | number;
  type?: inputType;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  rows?: number,
  onChange?: (value: number | string) => void
}
const Input:React.FC<InputProps> = (props) => {
  const { value, type,className,disabled,rows, onChange, min, max, defaultValue, style } = props

  const [inputValue, setInputValue] = useState<string | number>(type === 'number' ? 0 : '')
  useEffect(() => {
    defaultValue && setInputValue(defaultValue)
  },[defaultValue])

  useEffect(() => {
    value && setInputValue(value)
  },[value])


  const classes = classnames('input-wrapper',className)

  const handleChange = (v: number | string) => {
    onChange && onChange(v)
    setInputValue(v)
  }

  const renderInput = (t: inputType) => {
    switch ( t ) {
      case 'number': {
        return (
          <input
            type='number'
            min={min || 0}
            max={max || 100} 
            onChange={(e) => handleChange(e.target.value) }
            disabled={disabled}
            value={inputValue}
            style={style}
          />
        )
      }
      case 'textArea': {
        return ( 
          <textarea 
            onChange={(e) => handleChange(e.target.value) }
            disabled={disabled} 
            rows={rows} 
            value={inputValue}
            style={style}
          /> 
        )
      }
      default: {
        return( <input 
          type='text'
          disabled={disabled} 
          value={inputValue}
          style={style}
        />)
      }
    }
  }

  
  return (
    <div className={classes}>
      {renderInput(type || 'text')}
    </div>
  )
}

Input.defaultProps = {
  value: '',
  step: 1,
  disabled: false
}

export default Input
