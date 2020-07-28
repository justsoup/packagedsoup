import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode='horizontal'|'vertical'
type SelectCallback=(selectedIndex:number)=>void

//interface Menu
export interface MenuProps{
    defaultIndex?:number;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback;
    children?:React.ReactNode;
}

//interface MenuProvider
interface IMenuContent{
    index:number;
    onSelect?:SelectCallback;
}

//create share context container
export const MenuContent=createContext<IMenuContent>({index:0})

//declare Menu
const Menu:React.FC<MenuProps>=(props)=>{
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
    }=props

    //default selected item
    const [currentActive,setActive]=useState(defaultIndex)

    //click to select item
    const handleClick=(index:number)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }

    //select item
    const selectItem:IMenuContent={
        index:currentActive? currentActive:0,
        onSelect:handleClick,
    }

    //set up Menu mode
    const classes=classNames('menu',className,{
        'menu-vertical':mode==='vertical'
    })

    //instantiate Menu item and return item clone
    const renderChildren=()=>{
        return React.Children.map(children,(item,index)=>{
            const childElement=item as React.FunctionComponentElement<MenuItemProps>;
            const {displayName}=childElement.type
            if(displayName==='MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{index})
            }else{
                console.error('waring: Menu has a child whild which is not a MenuItem');
            }
        })
    }

    //return Menu HTML and CSS
    return (
        <ul className={classes} style={style} data-testid='testid'>
            <MenuContent.Provider value={selectItem}>
                {renderChildren()}
            </MenuContent.Provider> 
        </ul>
    )
}

//set up Menu default props
Menu.defaultProps={
    defaultIndex:0,
    mode:'horizontal'
}

//export Menu
export default Menu