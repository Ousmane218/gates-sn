import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdvancedSearch from '../AdvancedSearch';

describe('AdvancedSearch', () => {
    it('renders search input', () => {
        const { getByPlaceholderText } = render(
            <AdvancedSearch lang="en" onSearchResults={jest.fn()} />
        );
        expect(getByPlaceholderText('Search watches, accessories...')).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        const { getByPlaceholderText } = render(
            <AdvancedSearch lang="en" onSearchResults={jest.fn()} />
        );
        const input = getByPlaceholderText('Search watches, accessories...');
        fireEvent.change(input, { target: { value: 'watch' } });
        expect(input.value).toBe('watch');
    });
}); 