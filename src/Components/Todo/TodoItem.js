import React from 'react'
import {partial} from '../../lib/utils'
import FaClose from 'react-icons/lib/fa/close'
export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle,props.id);
  const handleRemove = partial(props.handleRemove,props.id);
  return (
    <li>
      <span className='remove-item'><a href='#' onClick={handleRemove} ><FaClose /></a></span>
      <input type='checkbox' onChange={handleToggle} checked={props.isComplete} />{props.name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id:React.PropTypes.number.isRequired
}
