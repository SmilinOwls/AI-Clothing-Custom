import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../config/helpers';

function CustomButton({ type, content, customStyles, handleClick }) {
    const snap = useSnapshot(state);
    const style = (type) => {
        if (type === 'filled') {
            return {
                color: getContrastingColor(snap.color),
                backgroundColor: snap.color,
            }
        } else if (type === 'outline') {
            return {
                color: snap.color,
                borderColor: snap.color,
                borderWidth: '1px',
            }
        }
    };

    return (
        <button
            className={`px-2 py-2 rounded-md flex-1 ${customStyles}`}
            style={style(type)}
            onClick={handleClick}
        >
            {content}
        </button>
    )
}

export default CustomButton