import React from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
        <Menu defaultIndex={0}>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1}>
            cool link
          </MenuItem>
          <MenuItem index={2}>
            cool link
          </MenuItem>
        </Menu>

    </div>
  )
}

export default App