import { createApp } from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
  RiSwordLine, 
  CoHeart, 
  PrShield, 
  GiFire, 
  SiFirebase, 
  SiSpeedtest   
} from "oh-vue-icons/icons";

addIcons(
  RiSwordLine, 
  CoHeart, 
  PrShield, 
  GiFire, 
  SiFirebase, 
  SiSpeedtest  
);


const app = createApp(App)
app.component("v-icon", OhVueIcon);
app.mount('#app')
