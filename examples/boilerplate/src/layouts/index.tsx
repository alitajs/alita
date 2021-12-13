import { Link } from 'alita';
import React from 'react';
import AlitaLayout from '../.umi/mobile-layout/AlitaLayout';

export default function Layout(props) {
  return (
    <AlitaLayout {...props}>
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
    </AlitaLayout>
  );
}
