import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <Button onClick={()=>{alert(111)}}
        className='sb'
        btnSize={ButtonSize.Large} 
        btnType={ButtonType.Danger}
      >hello</Button>
            <Button
        btnSize={ButtonSize.Small} 
        btnType={ButtonType.Ordinary}
      >hello</Button>

    </div>
  )
}

export default App