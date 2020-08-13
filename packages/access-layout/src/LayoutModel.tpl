import { useState } from 'react';

export default () => {
  const [access, setAccess] = useState<any>({});
  const [menu, setMenu] = useState<any>([]);
  const [layoutConfig, setLayoutConfig] = useState<any>({});
  return { access, setAccess, layoutConfig, setLayoutConfig, menu, setMenu };
}
