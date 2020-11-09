import React from 'react';

export const Placeholder = ({title}) => {

  return (
    <div style={{display:'flex'}} className="placeholder-container">
      <div><i className="fad fa-empty-set"></i></div>
      <div>{title}</div>
    </div>
  )
}
