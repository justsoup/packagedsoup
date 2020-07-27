import React from 'react'
import classNames from 'classnames'
import '../../styles/index.scss'


export enum ButtonSize {
  Large = 'la',
  Normal= 'nor',
  Small = 'sm'
}

export enum ButtonType {
  Ordinary = 'ordinary',
  Danger = 'danger',
  Default = 'default',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  btnSize?: ButtonSize
  btnType?: ButtonType
  href?: string
  children: React.ReactNode
}

type NativeButtonProps=BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps=BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps= Partial<NativeButtonProps & AnchorButtonProps>
const Button:React.FC<ButtonProps>=(props)=>{
  const {
    className,
    disabled,
    btnSize,
    btnType,
    href,
    children,
    ...restProps
  }=props

  const classes = classNames('btn',className,{
    [`btn-${btnType}`]: btnType,
    [`btn-${btnSize}`]: btnSize,
    'disabled': disabled
  })
  if(btnType===ButtonType.Link && href){
    return (
      <a 
      className={classes}
      href={href}
      {...restProps}
    >{children}</a>
    )
  }else{
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
  btnSize:ButtonSize.Large
}

export default Button