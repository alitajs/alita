export default () => `
import { NavBarListItem } from '@alitajs/alita-layout';

let pageNavBar = {};
const setPageNavBar = (value:NavBarListItem)=>{
  if(!value.pagePath||!value.navBar){
    console.error('setPageNavBar: value.pagePath can not be undefined')
    return;
  }
  pageNavBar={...pageNavBar,[value.pagePath]:value.navBar}
}
const getPageNavBar = ()=>pageNavBar;

export {
  getPageNavBar,setPageNavBar,
}
`;
