import type { Tool } from './types'
import illustratorLogo from "@/assets/tools/adobe-illustrator-logo.svg";
import photoshopLogo from "@/assets/tools/adobe-photoshop-logo.svg";
import canvaLogo from "@/assets/tools/canva-logo.svg";
import capcutLogo from "@/assets/tools/capcut-logo.svg";
import officeLogo from "@/assets/tools/office-logo.svg";

export const tools: Tool[] = [
  { name: 'Illustrator', src: illustratorLogo },
  { name: 'Photoshop', src: photoshopLogo },
  { name: 'Canva', src: canvaLogo },
  { name: 'CapCut', src: capcutLogo },
  { name: 'Office', src: officeLogo },
]
