import React, { useEffect, useState } from 'react'
import Die from './component/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  var [dice , setdice] = useState(numgenerator())
  var [tenzies , settenzies] = useState(false)


  var elements = dice.map(function(die){
    return <Die 
    value={die.value}
    isHeld={die.isheld}
    key={die.id}
    holddice={() => holddice(die.id)}
    />

  })

  function numgenerator(){
    var array = []
    for (let index = 0; index < 10; index++) {
      array.push(
        {value: Math.ceil(Math.random() * 6) ,
        isheld : false ,
        id : nanoid()
      })

    }
    return array
  }


function rolldice(){
  if(!tenzies){     // if the game is not over
    setdice(olddice => olddice.map(function(die){
    return die.isheld ? die : 
      {...dice , value: Math.ceil(Math.random() * 6) ,
      isheld : false ,
      id : nanoid()}
  }))
}
else{
  settenzies(false)
  setdice(numgenerator())
}

}


function holddice(id){
  setdice(olddice => olddice.map(function(die){
    return die.id === id ? {...die , isheld : ! die.isheld} : die  // if its the same die with the id that pass to function
  }))

}

useEffect(()=>{
  var allheld = dice.every(die => die.isheld === true)
  var firstvalue = dice[0].value
  var allsamevalue = dice.every(die => die.value === firstvalue )
  if(allheld && allsamevalue){
    settenzies(true)
  }
},[dice])


  return (
    <main>
      {tenzies && <Confetti />}
      <div className='main-container'> 
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='container'>
          {elements}
        </div>
        <button onClick={rolldice}>{tenzies ? "NewGame" : "Roll"}</button>
      </div>
    </main>
  )
}

export default App
