import React from 'react'
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

function Shirt() {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('./shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  
  console.log(nodes);

  return (
    <group>
        <mesh
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lamert1}
            material-roughness={1}
            dispose={null}
        >
        </mesh>
    </group>
  )
}

export default Shirt