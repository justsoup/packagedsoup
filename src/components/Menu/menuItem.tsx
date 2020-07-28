import React,{useContext} from 'react'
import classNames from 'classnames'
import {MenuContent} from './menu'

//interface MenuItem
export interface MenuItemProps{
    index?:string;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties;
}

//declare MenuItem
const MenuItem:React.FC<MenuItemProps>=(props)=>{
    const {
        index,
        disabled,
        className,
        style,
        children
    }=props

    //get Menu share context
    const context=useContext(MenuContent)

    //judge MenuItem disabled and active
    const classes=classNames('menu-item',className,{
        'disabled':disabled,
        'active':context.index===index
    })

    //click to select item
    const handleClick=()=>{
        if(context.onSelect && !disabled && typeof index==='string'){
            context.onSelect(index)
        }
    }

    //return MenuItem HTML and CSS
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

//instantiate MenuItem and set up alias
MenuItem.displayName='MenuItem'

//export MenuItem
export default MenuItem