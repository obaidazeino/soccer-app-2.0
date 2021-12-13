import './App.css';
import logo from "./images/SVG/logo.svg"
import pattern from "./images/SVG/right-pattern.svg"
import React, {useEffect, useState} from "react"
import Pattern from "./components/Pattern"
import Dropdown from "./components/Dropdown"
 
function App() {
  let [compare, setCompare] = useState(false)

  function handleClick(){
    setCompare(true)
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
      <Pattern class="pattern1" img={pattern}/>
      <div className="dropdowns">
        <Dropdown default="33"/>
        {compare && <Dropdown default="34"/>}
        {!compare && <div className="dropdown addition">
          <h3>Compare teams!</h3>
          <button onClick={handleClick}>+</button>
        </div>}
      </div>
      <Pattern class="pattern2" img={pattern}/>
      
      

    </div>
  );
}

export default App;
