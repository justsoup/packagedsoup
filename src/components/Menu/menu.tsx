import React,{useState,createContext} from 'react'
import classNames from 'classnames'

type MenuMode='horizontal'|'vertical'
type SelectCallback=(selectedIndex:number)=>void
export interface MenuProps{
    defaultIndex?:number;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback;
}

interface IMenuContent{
    index:number;
    onSelect?:SelectCallback;
}

export const MenuContent=createContext<IMenuContent>({index:0})
const Menu:React.FC<MenuProps>=(props)=>{
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect
    }=props
    const [currentActive,setActive]=useState(defaultIndex)
    const handleClick=(index:number)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const selectItem:IMenuContent={
        index:currentActive? currentActive:0,
        onSelect:handleClick,
    }

    const classes=classNames('menu',className,{
        'menu-vertical':mode==='vertical'
    })

    return (
        <ul className={classes} style={style}>
            <MenuContent.Provider value={selectItem}>
                {children}
            </MenuContent.Provider> 
        </ul>
    )
}

Menu.defaultProps={
    defaultIndex:0,
    mode:'horizontal'
}

export default Menu