import React, { useState } from 'react';

function Input() {
  return (
    <input placeholder="Your input here" />
  )
}

function Test() {
  const [inputList, setInputList] = useState([])
  const onAddBtnClick = () => {
    var i = inputList;
    setInputList(inputList.concat(<Input key={i.length} />))
  }

  return (
    <div>
      <button onClick={onAddBtnClick}>Add input</button>
      {inputList.map(input => { return input })}
    </div>
  )
}

export default Test;