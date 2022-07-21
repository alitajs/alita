import { render } from '@testing-library/react';
import SearchBar from '..';

describe('SearchBar', () => {
  it('Render correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });
});
