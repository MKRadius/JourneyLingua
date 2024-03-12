import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Exercise from '../../components/Exercise.tsx';

describe('Exercise component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <Exercise />
            </MemoryRouter>
        );
    });

    it('navigates to /image-to-text when "Image to text" button is clicked', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Exercise />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Image to text'));
        expect(window.location.pathname).toBe('/image-to-text');
    });

    it('navigates to /make-a-sentence when "Make a sentence" button is clicked', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Exercise />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Make a sentence'));
        expect(window.location.pathname).toBe('/make-a-sentence');
    });

    // Add more tests for other button clicks or UI interactions as needed
});
