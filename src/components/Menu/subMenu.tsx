import React,{useContext,useState, FunctionComponentElement} from 'react'
import classNames from 'classnames'
import {MenuContent} from '../Menu/menu'
import {MenuItemProps} from '../Menu/menuItem'
import Icon from '../Icon/icon'

//interface SubMenu
export interface SubMenuProps{
    index?:string;
    title:string;
    className?:string;
    children?:React.ReactNode;
}

//declare SubMenu
const SubMenu:React.FC<SubMenuProps>=(props)=>{
    const {index,title,className,children}=props



    //get Menu share context
    const context=useContext(MenuContent)

    const openSubMenu = context.defaultOpenSubMenu as Array<string>;
    const isOpened= (index && context.mode === 'vertical') ? openSubMenu.includes(index):false


    //set up switch
    const [menuOpen,setMenuOpen]=useState(isOpened)

    //set up SubMenu display
    const subMenuClasses=classNames('submenu',{
        'menu-opened':menuOpen
    })

    //judge MenuItem active
    const classes=classNames('menu-item submenu-item',className,{
        'active':context.index===index,
        'is-opened':menuOpen,
        'is-vertical':context.mode==='vertical'

    })

    //click and change switch
    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    let timer:any
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer=setTimeout(()=>{
            setMenuOpen(toggle)
        },300)
    }

    //instantiate Menu item and return item
    const renderChildren=()=>{
        const childrenComponent=React.Children.map(children,(item,i)=>{
            const childElement=item as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName==='MenuItem'){
                return React.cloneElement(childElement,{index:`${index}-${i}`});
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

    const clickEvent = context.mode === 'vertical' ? {
        onClick: handleClick,
    } : {}

    const hoveEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}

    //return SubMenu HTML and CSS
    return (
        <li key={index} className={classes} {...hoveEvent}>
            <div className="submenu-title" {...clickEvent}>
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            {renderChildren()}
        </li>
    )
}

//set up SubMenu default props
SubMenu.defaultProps={
    index:'0',
    title:'justsoup',
}

//instantiate SubMenu and set up alias
SubMenu.displayName='SubMenu'

//export SubMenu
export default SubMenu