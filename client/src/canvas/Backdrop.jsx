import React, { useRef } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

function Backdrop() {

  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      position={[0, 0, -0.14]}
      rotation={[ Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.5}
        ambient={0.2}
        position={[5, 5, -10]}

      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -10]}

      />
    </AccumulativeShadows>
  )
}

export default Backdrop