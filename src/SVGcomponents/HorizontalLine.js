import React from 'react';

const HorizontalLine = ({height, ...props}) => {
  return (
    <line
      x1="0" x2="100"
      y1={height} y2={height}
      {...props}
    />
  )
}

export default HorizontalLine;
