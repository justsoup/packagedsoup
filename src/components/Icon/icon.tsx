import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon,FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas) //import all icon from fas


export type ThemeProps = 'ordinary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dary';


export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps,
    className?:string,
}

const Icon: React.FC<IconProps> = (props) =>{
    const {theme,className,...restProps}=props
    const classes=classNames('icon',className,{
        [`icon-${theme}`]:theme
    })
    
    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

//use to add color
export default Icon