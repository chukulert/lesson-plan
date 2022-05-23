import { render, screen } from '@testing-library/react';
import LessonDisplay from './LessonDisplay';

test('renders lesson content', () => {
  render(<LessonDisplay lesson={{content: 'abc', subject: 'cba', date: '2022-05-17'}} />);
  const content = screen.getByText('abc')
  const subject = screen.getByText('cba')
  const date = screen.getByText('17 May 2022')

  expect(content).toBeInTheDocument();
  expect(subject).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});
