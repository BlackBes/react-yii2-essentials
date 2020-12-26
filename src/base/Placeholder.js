import React from 'react';

/**
 * A placeholder component to be used in places where blank white screen looks to ugly!
 * @param title Content that will be shown. Can be some text or HTML markup.
 */
const Placeholder = ({title}) => {
  return (
    <div style={{display:'flex'}} className="placeholder-container">
      <div>{title}</div>
    </div>
  )
}
export default Placeholder
