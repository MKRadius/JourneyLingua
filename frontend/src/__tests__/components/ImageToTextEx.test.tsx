// import '@testing-library/jest-dom/extend-expect';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import ImageToTextEx from '../../components/ImageToTextEx.tsx';
//
// jest.mock('../hooks/exerciseHooks', () => ({
//     fetchExercise: jest.fn(() => Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve([
//             { wordFin: 'apple', imageLink: 'apple.jpg' },
//             { wordFin: 'banana', imageLink: 'banana.jpg' },
//             { wordFin: 'orange', imageLink: 'orange.jpg' }
//         ])
//     }))
// }));
//
// describe('ImageToTextEx component', () => {
//     it('renders correctly', async () => {
//         const { getByText, getByAltText } = render(<ImageToTextEx />);
//
//         // Check if loading message is displayed
//         expect(getByText('Loading...')).toBeInTheDocument();
//
//         // Wait for the component to finish loading
//         await waitFor(() => expect(getByText('Text-Image Exercise')).toBeInTheDocument());
//
//         // Check if the first exercise image is displayed
//         expect(getByAltText('Exercise Image')).toHaveAttribute('src', 'apple.jpg');
//     });
//
//     it('handles user answer correctly', async () => {
//         const { getByText, getByAltText, getByTestId } = render(<ImageToTextEx />);
//
//         await waitFor(() => expect(getByText('Text-Image Exercise')).toBeInTheDocument());
//
//         // Click on the correct answer
//         fireEvent.click(getByText('apple'));
//
//         // Check if the feedback message appears
//         expect(getByTestId('feedback-message')).toHaveTextContent('Correct!');
//
//         // Check if it moves to the next question after a delay
//         await waitFor(() => expect(getByAltText('Exercise Image')).toHaveAttribute('src', 'banana.jpg'));
//     });
//
//     // Add more tests for other scenarios as needed
// });
