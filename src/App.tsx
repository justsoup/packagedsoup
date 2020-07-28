import React from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
        <Menu defaultIndex={0} mode={'horizontal'}>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <SubMenu title={'submenu'}>
            <MenuItem>
              sub111
            </MenuItem>
            <MenuItem>
              sub111 
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