import React from 'react';

const GraphedLine = ({values, fill, fillType, ...rest}) => {
  const xIncrement = 100 / values.length;
  let firstCorner = '';
  let lastCorner = '';

  if(fill){
    if(fillType === 'top'){
      firstCorner = "0 0 L"
      lastCorner = "L 100 0"
    } else {
      firstCorner = "0 100 L"
      lastCorner = "L 100 100"
    }
  }

  return (
    <path
      d={
        `M ${firstCorner} 0 ${values[0]}` +
        values.slice(-(values.length - 1)).reduce((acc, val, i) => 
          acc + `L ${xIncrement * (i + 1)} ${val}`,
          '',
        ) + lastCorner
      }
      fill={fill || "none"}
      vectorEffect="non-scaling-stroke"
      {...rest}
    />
  )
}

export default GraphedLine;
