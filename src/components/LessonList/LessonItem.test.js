import { render, screen } from '@testing-library/react';
import LessonItem from './LessonItem'

test('renders lesson details', () => {
  render(<LessonItem subject={'ab'} date={'2022-05-16'} />);
  const subject = screen.getByText('ab')
  const date = screen.getByText('16 May 2022')

  expect(subject).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});