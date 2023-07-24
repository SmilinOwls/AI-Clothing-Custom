import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';
import state from '../store';


function CameraRig({ children }) {

  const snap = useSnapshot(state);
  const group = useRef();

  useFrame((state, delta) => {

    const isMobile = window.innerWidth <= 600;

    // set the initial position of the modal
    let target = !isMobile ? [0, 0, 1.5] : snap.intro ? [0, 0.2, 1.5] : [0, 0, 1.5];
    if(snap.intro && window.innerWidth > 1260) target = [-0.3, 0, 1.5];

    // set the model camera position
    easing.damp3(
      state.camera.position,
      target,
      0.25,
      delta
    );

    // justify the modal to rotate smoothly (according to cursor)
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  });

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig