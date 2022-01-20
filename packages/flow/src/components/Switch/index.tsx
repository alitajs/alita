import React from 'react';

interface SwitchProps {
  fallback?: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
}

interface MatchProps {
  when: boolean;
  children: React.ReactElement;
}

const Match: React.FC<MatchProps> = (props) => {
  const { when, children, ...other } = props;
  return React.cloneElement(children, {
    ...other,
  });
};

/**
 * switches between content based on mutually exclusive conditions
 * ```typescript
 * <Switch fallback={<FourOhFour />}>
 *   <Match when={state.route === 'home'}>
 *     <Home />
 *   </Match>
 *   <Match when={state.route === 'settings'}>
 *     <Settings />
 *   </Match>
 * </Switch>
 * ```
 */
const Switch: React.FC<SwitchProps> = (props) => {
  const { fallback = <></>, children } = props;
  const childs = React.Children.toArray(children).filter(
    (i: any) => i?.props?.when,
  ) as React.ReactElement[];
  if (childs.length === 0 && fallback) return fallback;
  return <>{childs[0]?.props?.children}</>;
};

export { Match };
export default Switch;
