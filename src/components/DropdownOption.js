import React from 'react'

const DropdownOption = (props) => {
    console.log('DropdownOption component is being rendered.');
    //console.log(props.handleOptionClick);
    console.log(props.text);
    return (<a
      href="#"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={props.handleOptionClick}
    >
      {props.text}
    </a>)
}

export default DropdownOption
