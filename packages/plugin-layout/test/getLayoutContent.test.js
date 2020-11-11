import getLayoutContent from '../src/utils/getLayoutContent';

describe('getLayoutContent', () => {
  test('getLayoutContent', () => {
    const LayoutContent = getLayoutContent({}, 'test');

    expect(
      LayoutContent.includes(`import LayoutComponent from 'test';`),
    ).toBeTruthy();
    expect(LayoutContent.includes(`...{}`)).toBeTruthy();
  });
});
