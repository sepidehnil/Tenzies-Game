import React from 'react'

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}
  return (
    <div className='dice-container' onClick={props.holddice} style={styles}>
      <h2 className='dice-num'>{props.value}</h2>
    </div>
  )
}

export default Die