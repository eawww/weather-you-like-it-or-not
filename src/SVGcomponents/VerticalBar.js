import React from 'react';

const VerticalBar = ({xStart, xEnd, ...props}) => {
  return (
    <rect
      x={xStart}
      y="0"
      width={xEnd - xStart}
      height="100"
      {...props}
    />
  )
}

export default VerticalBar;
