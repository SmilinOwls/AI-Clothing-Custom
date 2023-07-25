import React from 'react'
import { useSnapshot } from 'valtio';
import state from '../store';

function Tab( { tab, isFilterTab, handleClick}) {
  
  const snap = useSnapshot(state);

  return (
    <div
      className={`tab-btn`}
      onClick={handleClick}
      style={isFilterTab  ? {
        borderRadius: "100%",
        backgroundColor: snap.color,
        opacity: 0.5
      } : {
        backgroundColor: "transparent",
        opacity: 1
      }}
    >
      <img src={tab.icon} alt={tab.name} className={`object-contain ${isFilterTab ? 'w-2/3 h-2/3': 'w-11/12 h-11/12'}`}/>
    </div>
  )
}

export default Tab