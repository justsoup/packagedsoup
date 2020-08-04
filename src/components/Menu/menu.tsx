import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode='horizontal'|'vertical'
type SelectCallback=(selectedIndex:string)=>void

//interface Menu
export interface MenuProps{
    defaultIndex?:string;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback;
    defaultOpenSubMenu?:string[];
    children?:React.ReactNode;
}

//interface MenuProvider
interface IMenuContent{
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode;
    defaultOpenSubMenu?:string[];
}

//create share context container
export const MenuContent=createContext<IMenuContent>({index:'0'})

//declare Menu
const Menu:React.FC<MenuProps>=(props)=>{
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenu,
    }=props

    //default selected item
    const [currentActive,setActive]=useState(defaultIndex)

    //click to select item
    const handleClick=(index:string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    //select item
    const selectItem:IMenuContent={
        index:currentActive? currentActive:'0',
        onSelect:handleClick,
        mode,
        defaultOpenSubMenu,
    }

    //set up Menu mode
    const classes=classNames('menu',className,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal':mode!=='vertical',
    })

    //instantiate Menu item and return item clone
    const renderChildren=()=>{
        return React.Children.map(children,(item,index)=>{
            const childElement=item as React.FunctionComponentElement<MenuItemProps>;
            const {displayName}=childElement.type
            if(displayName==='MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{index:index.toString()})
            }else{
                console.error('waring: Menu has a child whild which is not a MenuItem');
            }
        })
    }

    //return Menu HTML and CSS
    return (
        <ul className={classes} style={style}>
            <MenuContent.Provider value={selectItem}>
                {renderChildren()}
            </MenuContent.Provider> 
        </ul>
    )
}

//set up Menu default props
Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal',
    defaultOpenSubMenu:[],
}

//export Menu
export default Menu