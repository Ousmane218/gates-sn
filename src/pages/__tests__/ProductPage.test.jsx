import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../ProductPage';
import products from '../../data/products';

describe('ProductDetail', () => {
    const validSlug = products[0] && products[0].items[0]
        ? products[0].items[0].name.en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : 'watch';

    it('renders product details for valid slug', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[`/product/${validSlug}`]}>
                <Routes>
                    <Route path="/product/:slug" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );
        expect(getByText(/price|prix/i)).toBeInTheDocument();
    });

    it('shows not found for invalid slug', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[`/product/invalid-slug`]}>
                <Routes>
                    <Route path="/product/:slug" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );
        expect(getByText(/not found/i)).toBeInTheDocument();
    });

    it('navigates back to product list when back button is clicked', async () => {
        const user = userEvent.setup();
        let location = null;
        const LocationDisplay = () => {
            // eslint-disable-next-line
            location = window.location.pathname;
            return null;
        };
        const { getByRole } = render(
            <MemoryRouter initialEntries={[`/product/${validSlug}`]}>
                <Routes>
                    <Route path="/product/:slug" element={<><ProductDetail /><LocationDisplay /></>} />
                    <Route path="/" element={<div>Product List</div>} />
                </Routes>
            </MemoryRouter>
        );
        const backButton = getByRole('button', { name: /back to product/i });
        await user.click(backButton);
        expect(window.location.pathname).toBe('/');
    });
}); 