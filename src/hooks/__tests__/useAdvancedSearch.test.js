import { renderHook, act } from '@testing-library/react-hooks';
import { useAdvancedSearch } from '../useAdvancedSearch';

describe('useAdvancedSearch', () => {
    it('should update searchTerm and generate suggestions', () => {
        const onSearchResults = jest.fn();
        const { result } = renderHook(() => useAdvancedSearch({ lang: 'en', onSearchResults }));
        act(() => {
            result.current.handleSearchChange({ target: { value: 'watch' } });
        });
        expect(result.current.searchTerm).toBe('watch');
        expect(Array.isArray(result.current.suggestions)).toBe(true);
    });

    it('should perform search and call onSearchResults', async () => {
        const onSearchResults = jest.fn();
        const { result } = renderHook(() => useAdvancedSearch({ lang: 'en', onSearchResults }));
        await act(async () => {
            await result.current.performSearch('watch');
        });
        expect(onSearchResults).toHaveBeenCalled();
    });
}); 