import { renderHook, act } from '@testing-library/react-hooks';
import { useProductModal } from '../useProductModal';

describe('useProductModal', () => {
    it('should open and close modal', () => {
        const { result } = renderHook(() => useProductModal());
        act(() => {
            result.current.openModal('img.jpg');
        });
        expect(result.current.modalImg).toBe('img.jpg');
        act(() => {
            result.current.closeModal();
        });
        expect(result.current.modalImg).toBe(null);
    });
}); 