import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('表示されるテキストの確認', () => {
  render(<Hello name="Taro" />);
  expect(screen.getByText('Hello, Taro!')).toBeInTheDocument();
});