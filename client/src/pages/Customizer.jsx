import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import config from '../config/config';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constraint';
import { slideAnimation, fadeAnimation } from '../config/motion';
import { AIPicker, FilePicker, ColorPicker, CustomButton, Tab } from '../components';

function Customizer() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className='absolute top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              content="Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit font-bold text-md py-2 px-4"
            />
          </motion.div>

          <motion.div
            className='absolute top-0 left-0 z-5'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab, idx) => (
                  <Tab
                    key={idx}
                    tab={tab}
                    handleClick={() => { }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute bottom-5 left-0 z-5 w-screen'
            {...slideAnimation('up')}
          >
            <div className='flex justify-center'>
              <div className='filtertabs-container'>
                {FilterTabs.map((tab, idx) => (
                  <Tab
                    key={idx}
                    tab={tab}
                    isActiveTab
                    isFilterTab
                    handleClick={() => { }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer