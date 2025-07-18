import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
    const item = {
        image: 'img.jpg',
        name: { en: 'Watch', fr: 'Montre' },
        description: { en: 'A nice watch', fr: 'Une belle montre' },
        price: '10000 CFA',
        outOfStock: false
    };
    const phone = '221760162920';

    it('renders product info', () => {
        const { getByText } = render(
            <MemoryRouter>
                <ProductCard
                    item={item}
                    lang="en"
                    phone={phone}
                    openDescIdx={null}
                    setOpenDescIdx={jest.fn()}
                    idx={0}
                />
            </MemoryRouter>
        );
        expect(getByText('Watch')).toBeInTheDocument();
        expect(getByText('10000 CFA')).toBeInTheDocument();
    });

    it('renders WhatsApp link', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <ProductCard
                    item={item}
                    lang="en"
                    phone={phone}
                    openDescIdx={null}
                    setOpenDescIdx={jest.fn()}
                    idx={0}
                />
            </MemoryRouter>
        );
        const link = getByRole('link', { name: /order/i });
        expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
    });

    it('navigates to product detail page on image or name click', () => {
        const { getAllByRole } = render(
            <MemoryRouter>
                <ProductCard
                    item={item}
                    lang="en"
                    phone={phone}
                    openDescIdx={null}
                    setOpenDescIdx={jest.fn()}
                    idx={0}
                />
            </MemoryRouter>
        );
        const links = getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/product/watch');
        expect(links[1]).toHaveAttribute('href', '/product/watch');
    });
}); 