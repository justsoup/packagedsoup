import React from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
        <Menu defaultIndex={'0'} mode={'vertical'}
        onSelect={(index)=>{console.log(index) }}
        defaultOpenSubMenu={['4']}
        >
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            xyz
          </MenuItem>
          <SubMenu title={'download'}>
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

    </div>
  )
}

export default App