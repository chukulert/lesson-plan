// import { render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import LessonForm from './LessonForm';


// test('renders draft content', () => {
//     act(() => {
//         render(<LessonForm draft={{content: 'abc', subject: 'cba', date: '2022-05-17'}} />);
//       });

//   expect(screen.getByRole('input', { name: 'subject' })).toHaveValue('cba');
//   expect(screen.getByRole('textarea', { name: 'content' })).toHaveValue('abc');
//   expect(screen.getByRole('input', { name: 'date' })).toHaveValue('2022-05-17');
//   const checkbox = screen.getByTestId('draft')
//   expect(checkbox.checked).toEqual(true)
// });