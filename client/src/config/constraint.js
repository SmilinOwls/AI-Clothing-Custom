import { ai, file, logoShirt, stylishShirt, swatch } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: file,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    decal: "logoDecal",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    decal: "fullDecal",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: "logoDecal", 
  full: "fullDecal"
};
