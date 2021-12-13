import * as React from 'react';
import type { InspectProps } from '{{{ inspxpath }}}';

const Inspect = React.lazy(() => import('{{{ inspxpath }}}'));
const InspectImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAZKADAAQAAAABAAAAZAAAAAAMc/x7AAAG7ElEQVR4Ae1bTUhVTxSf/Mj8whRSQTcmoSAS1SJMUVBJcZFEuIpSQQI3tkushBRcqLgREQUFXdgmsJblJnGX34hGLRI3ikhZoWWiOf85j+79v4/73pvn3Jk393kGHvfemXPOnPv7zZk7X+8cIYSyHyZNEIjSxA904x8CSIhmTQEJQUI0Q0AzdzBCkBDNENDMHYwQJEQzBDRzByMECdEMAc3cwQhBQjRDQDN3MEKQEM0Q0MwdjBAkRDMENHMHIwQJ0QwBzdzBCEFCNENAM3cwQpAQTwSio6NJfn4+uXnzJklMTPQsPKNPcAxI+S8zM5O+evWK/v79mxrp79+/dGVlhVZVVSn3JxwY+KlTPRkVFRV0d3fX4MHyOjQ0dFZJUUtIWloa3drasiTBO7OhoeEskqKWkMHBQW/c/T7/+PGDsu/KmSJF+SirrKyM+1OdkpJCrl69yi0fCYJKCblw4QLJy8sLCbdr166FJO90YaWEHB0dkcPDw5AwOzg4CEne6cJKCWHDWrK8vBwSZouLiyHJO11YKSEA1ps3b7gx+/LlC1lbW+OWjxRBpaMYNjOns7OzfkdWRgFMEktKSpT6xgjVoT71TuTk5ND5+XkDe5/r/v4+bWpq0gGccPignhBoiTExMbStrY3Ozc3RP3/+uEhZX1+nL1++pJcvXw4HEFrUee5fmIa1+42NjSUJCQnk58+fYfVDh8q1IEQHIHTxQfkoS5cX19UPJEQzZmLC4c/AwACprKwMWjUb9pKvX796yMEm1tu3b8mlS5c88v09PH78mLx7985fsSv//v37pL29PaCMUfj582dy9+5dcnJyYmTZflU+unj9+rXPUNcqIyMjw9K3uro6K3HLvNXVVQpzH4aa5Q9Wkzc3Ny11vTNhblRUVGRpx5/9U+RbO3oKQ9yOihICvsHwmDc9evTIr28vXrzgNUO7u7v92rERL2cSkpqayt2yt7e3aVJSkg+YWVlZ9NevX1yEQKTFxcX52LCRCJdtx37Uv3//TthsnuERPLGuj7S2tvoIdnV1ueY/PgVeGcfHx6S+vj7klWovM9yP0llnnnjUYUeXZdgcHh7mauFwmCI7O9v0g+2zUPZh5tLt6Ogw9Yx6JV49wZJYkflSdhICXREsufCk8fFx04f379/zqNClpSXKVhJMPQX4OJsQAKi0tJTCCChYgoiAyLhz504wUVc520yjhYWFKsmAupxPCLxDX18fF8jT09OUzSW4ZJ8+faqajMghhO3X048fP3IBzSP04cOHgPMXWQ3ZsaMsCG33xJbwycOHDwmMiEQT2IJRFWw5q04RQwgAxza9CAxlRdOzZ8/Ip0+fRM2cWl95P2nnKIu9tYf/sPG1sLDA0ytZyszMzNCoqCgPm951yHyOqAiBJgldFnRdoR43Al02ayeNjY1SFw6hnkAp4giBl4WTKs+fPw/03pZlT548IXDSJdxJeXjK7LIYmK73iY+Pp3t7e5bdklXmt2/f6Pnz55VjYfhrXCMyQqCFs1VcwmbxcMuV2Kl8wuYdXLKyhZS3CtkRUlxczDVz944UdtSV3rhxQzkejGCzzoiLENhRZGtWhI2UQm7IbITm0mXL7CHr2qUQutd21SzJTm9vL8nNzT219YKCAtLZ2XlqfTsUzXBhxpTcy+qybt++7d0LneoZFipv3bqlBAtvzCMmQi5evEhGR0ftaKCu7m5sbIxr88qWCt2MRAwh/f39hG1Aub2a9e3k5CRhx1etC91yr1y5QtgeuluOulvloWl3l8WO5XB1TbC/wb4vrlP1PAqwf1JeXq4aHzXfDda+zBezkxB2Povu7Ozw4OvaMzH8gP/I86SNjQ2anJxs+m7oS7z+D5TESjxeyE5CWBfEgytlB+4o+86YfsBfIoxT98EMjIyMmHoKMHIuIQ8ePAiGpVne0tLiA2pPT49ZHuympqbGR18SOc4kBE6QsKNAwXB0lcOWrdVBBfa3a+7uDk43wlkwSSS423UmIVNTU1xkgFBtba37C3vcNzc3c9uZmJjw0JVEjvMICQVEOO4TCDg498uW67lJuXfvXkB7geriLHMWITBshf8g8iSYcV+/fj0ogNXV1TzmXDIwoktPTw9qkxN8Hzv4DyqGnE4pYmbqOoEq4gsSIoKeBF0kRAKoIiaREBH0JOgiIRJAFTGJhIigJ0EXCZEAqohJJEQEPQm6SIgEUEVMIiEi6EnQRUIkgCpiEgkRQU+CLhIiAVQRk0iICHoSdJEQCaCKmERCRNCToIuESABVxCQSIoKeBF0kRAKoIiaREBH0JOgiIRJAFTGJhIigJ0EXCZEAqohJJEQEPQm6SIgEUEVMIiEi6EnQRUIkgCpiEgkRQU+CLhIiAVQRk/8BGnu/xTEMOUAAAAAASUVORK5CYII=`;
const imgStyle = {
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  position: 'fixed',
  zIndex: '999',
  bottom: '{{{inspx.bottom}}}',
  right: '{{{inspx.right}}}'
}

const imgStyleClose = {
  transition: 'all 0.3s ease',
  filter: 'grayscale(100%)',
  opacity: '0.36',
  ...imgStyle
}
export function _InspxContainer(props: InspectProps) {
  const [open,setOpen] = React.useState(false);

  return (
    <React.Suspense fallback={null}>
      <img src={InspectImg} style={open?imgStyle:imgStyleClose} onClick={()=>{
        setOpen(!open);
        const event = new CustomEvent('inspxswitch');
        window.dispatchEvent(event);
        }}/>
      <Inspect {...props} {{#inspx}} disabled={ {{{inspx.disabled}}} } margin={ {{{inspx.margin}}} } size={ {{{inspx.size}}} } padding={ {{{inspx.padding}}} } {{/inspx }} />
    </React.Suspense>
  );
}
