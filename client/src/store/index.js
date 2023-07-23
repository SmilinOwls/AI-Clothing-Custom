import { proxy } from 'valtio';

const state = proxy({
    intro: true, // check if we're displaying the homepage or custom page,
    color: '#EFBD48',
    isLogoTexture: true, // check if we're displaying the logo on our shirt
    isFullTexture: false, // check if we're displaying full texture on our shirt
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',

});

export default state;