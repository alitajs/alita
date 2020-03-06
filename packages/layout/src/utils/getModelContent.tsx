export default () => `
let pageNavBar = {};
const setPageNavBar = (value:any)=>{
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
