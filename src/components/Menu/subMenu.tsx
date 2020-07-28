import React,{useContext,useState, FunctionComponentElement} from 'react'
import classNames from 'classnames'
import {MenuContent} from '../Menu/menu'
import {MenuItemProps} from '../Menu/menuItem'

//interface SubMenu
export interface SubMenuProps{
    index?:number;
    title:string;
    className?:string;
    style?:React.CSSProperties;
    children?:React.ReactNode;
}

//declare SubMenu
const SubMenu:React.FC<SubMenuProps>=(props)=>{
    const {index,title,className,children}=props

    //set up switch
    const [menuOpen,setMenuOpen]=useState(false)

    //get Menu share context
    const context=useContext(MenuContent)

    //set up SubMenu display
    const subMenuClasses=classNames('submenu',{
        'menu-opened':menuOpen
    })

    //judge MenuItem active
    const classes=classNames('menu-item submenu-item',className,{
        'active':context.index===index
    })

    //click and change switch
    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    //instantiate Menu item and return item
    const renderChildren=()=>{
        const childrenComponent=React.Children.map(children,(item,i)=>{
            const childElement=item as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName==='MenuItem'){
                return childElement;
            }else{
                console.error('waring: Menu has a child whild which is not a MenuItem');
            }
            
        })

        //return SubMenu was set
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    //return SubMenu HTML and CSS
    return (
        <li key={index} className={classes}>
            <div className="submenu-title" onClick={handleClick}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

//set up SubMenu default props
SubMenu.defaultProps={
    index:0,
    title:'justsoup',
}

//instantiate SubMenu and set up alias
SubMenu.displayName='SubMenu'

//export SubMenu
export default SubMenu