import React from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Input from './components/Input/input'
import {AutoComplete} from './components/Input/autoComplete'


function App() {
  const arg=['111','222','3333','555','abb']
  const handleFetch=(query:string)=>{   
    return arg.filter(item=>item.includes(query))
  }

  const renderOption=(item:string)=>{
    return (
      <h2>Name:{item}</h2>
    )
  }

  return (
    <div className="App">
        <AutoComplete 
          fetchSuggestion={handleFetch}
          renderOption={renderOption}
        />
        <Icon icon='address-card' theme='danger' size='10x' />
        <Menu defaultIndex={'0'} mode={'horizontal'}
        onSelect={(index)=>{console.log(index) }}
        defaultOpenSubMenu={['4']}
        >
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled={true}>
            xyz
          </MenuItem>
          <SubMenu title={'e'}>
            <MenuItem>
            download1
            </MenuItem>
            <MenuItem>
            download2
            </MenuItem>
            <MenuItem>
              sub111
            </MenuItem>
          </SubMenu>
        </Menu>
        <Input 
        placeholder="我是默认值"
        // prepend='http'
        // append='com'
        icon='search'
        size='la'
        ></Input>
    </div>
  )
}

export default App