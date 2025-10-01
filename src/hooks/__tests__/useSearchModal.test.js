import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchModal } from '../useSearchModal';

describe('useSearchModal', () => {
    it('should open and close search modal', () => {
        const { result } = renderHook(() => useSearchModal());
        act(() => {
            result.current.openSearchModal();
        });
        expect(result.current.showSearchModal).toBe(true);
        act(() => {
            result.current.closeSearchModal();
        });
        expect(result.current.showSearchModal).toBe(false);
    });
}); 