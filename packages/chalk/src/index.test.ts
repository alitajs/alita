import chalk from './index';

test('color utils', () => {
  expect(chalk.red('123')).toEqual(['%c123', 'color:#FF0000']);
});

test('color add', () => {
  expect(chalk.add(chalk.red('123'), chalk.blue('456'))).toEqual([
    ' %c123 %c456',
    'color:#FF0000',
    'color:#0000FF',
  ]);
});

test('hello', () => {
  expect(chalk.hello('Alita', '3.0.0')).toEqual(undefined);
});
