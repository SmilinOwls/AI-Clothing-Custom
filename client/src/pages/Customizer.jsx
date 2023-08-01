import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constraint';
import { slideAnimation, fadeAnimation } from '../config/motion';
import { AIPicker, FilePicker, ColorPicker, CustomButton, Tab } from '../components';

function Customizer() {
  const snap = useSnapshot(state);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoDecal: true,
    fullDecal: false
  });

  const handleActiveEditorTab = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "aipicker":
        return <AIPicker />
      case "filepicker":
        return <FilePicker handleDecal={handleDecal} />
      default:
        return null;
    }
  };

  const handleDecal = (type, result) => {
    const decalType = type !== "none" ? DecalTypes[type] : 'logoDecal';
    state[decalType] = type !== "none" ? result :  './threejs.png';

    if(!activeFilterTab[decalType]){
      handleActiveFilterTab(decalType);
    }
  };

  const handleActiveFilterTab = (decalType) => {
    switch(decalType) {
      case "logoDecal":
        state.isLogoTexture = !activeFilterTab.logoDecal;
        break;
      case "fullDecal":
        state.isFullTexture = !activeFilterTab.fullDecal;;
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    setActiveFilterTab({...activeFilterTab, [decalType]: !activeFilterTab[decalType]})
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className='absolute top-5 right-5 flex gap-3'
            {...fadeAnimation}
          >
            <CustomButton
              type="outline"
              content="Download"
              handleClick={downloadCanvasToImage}
              customStyles="w-fit font-bold text-md py-2 px-4 flex gap-2 justify-center"
            >
              <img src={download} alt="Download" className='object-contain w-6'/>
            </CustomButton>

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
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                { handleActiveEditorTab() }
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute bottom-5 left-0 z-5 w-screen'
            {...slideAnimation('up')}
          >
            <div className='flex justify-center'>
              <div className='filtertabs-container'>
                {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab={activeFilterTab[tab.decal]}
                    handleClick={() => handleActiveFilterTab(tab.decal)}
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