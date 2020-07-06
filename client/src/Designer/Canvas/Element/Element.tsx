import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default React.memo(function Element() {
  const ref = useRef<HTMLDivElement>(null);
  const position = useState({ X: 0, Y: 0 });

  return (
    <Draggable nodeRef={ref}>
      <div
        ref={ref}
        style={{
          width: 400,
          height: 150,
          border: '1px solid blue'
        }}
      >
        Element Here
      </div>
    </Draggable>
  );
});
