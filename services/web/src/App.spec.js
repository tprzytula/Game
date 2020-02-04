import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Given the App', () => {
    it('should render Game App text', () => {
        render(<App/>)

        expect(screen.getByText('Game App')).toBeInTheDocument()
    });
});