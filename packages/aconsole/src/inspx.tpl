import * as React from 'react';
import type { InspectProps } from 'inspx';

const Inspect = React.lazy(() => import('inspx'));

export function _InspxContainer(props: InspectProps) {
  return (
    <React.Suspense fallback={null}>
      <Inspect {...props} {{#inspx}} disabled={ {{{inspx.disabled}}} } margin={ {{{inspx.margin}}} } size={ {{{inspx.size}}} } padding={ {{{inspx.padding}}} } {{/inspx }} />
    </React.Suspense>
  );
}
