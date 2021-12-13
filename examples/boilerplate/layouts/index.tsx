import React from 'react';
import { Link } from 'umi';
import { useKeepOutlets } from '../.umi/plugin-keepalive/context';

export default function Layout() {
  const keepOutlets = useKeepOutlets();
  return (
    <div>
      <h2>global layout</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">/users</Link>
        </li>
        <li>
          <Link to="/users/foo">/users/foo</Link>
        </li>
      </ul>
      {keepOutlets}
    </div>
  );
}
