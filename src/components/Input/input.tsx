import React, { InputHTMLAttributes, ReactElement} from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize='la'|'sm'


export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
    disabled?:boolean;
    size?:InputSize;
    icon?:any;
    prepend?:string|ReactElement;   //add prepend
    append?:string|ReactElement;    //add append
    style?:React.CSSProperties;
    // onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
}

export const Input:React.FC<InputProps>=(props)=>{
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
    }=props



    const classes=classNames('input-wrapper',{
        [`input-size-${size}`]:size,
        'is-disabled':disabled,
        'input-group':prepend||append,
        'input-group-append':!!append,
        'input-group-prepend':!!prepend,
    })

    return (
        <div className={classes} style={style}>
            {prepend && <div className="input-group-prepend">{prepend}</div>}
            {Icon && !prepend && !append && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
            <input type="text" className="input-inner" {...restProps}/>
            {append && <div className="input-group-append">{append}</div>}
        </div>
    )
}

Input.defaultProps={
    disabled:false,
    size:'la',
}


export default Input