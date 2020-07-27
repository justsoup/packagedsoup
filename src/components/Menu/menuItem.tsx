import React,{useContext} from 'react'
import classNames from 'classnames'
import {MenuContent} from './menu'

export interface MenuItemProps{
    index:number;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties;
}

const MenuItem:React.FC<MenuItemProps>=(props)=>{
    const {
        index,
        disabled,
        className,
        style,
        children
    }=props
    const context=useContext(MenuContent)
    const classes=classNames('menu-item',className,{
        'disabled':disabled,
        'active':context.index===index
    })

    const handleClick=()=>{
        if(context.onSelect && !disabled){
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem