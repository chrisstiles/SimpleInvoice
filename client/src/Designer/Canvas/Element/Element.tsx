import React, { useRef } from 'react';
import Draggable from 'react-draggable';

export default React.memo(function Element() {
  const ref = useRef<HTMLDivElement>(null);

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
