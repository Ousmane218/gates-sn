import { renderHook, act } from '@testing-library/react-hooks';
import { useContactForm } from '../useContactForm';

describe('useContactForm', () => {
    it('should update formData on input change', () => {
        const { result } = renderHook(() => useContactForm('en'));
        act(() => {
            result.current.handleInputChange({ target: { name: 'name', value: 'John' } });
        });
        expect(result.current.formData.name).toBe('John');
    });

    it('should set error status for invalid input on submit', async () => {
        const { result } = renderHook(() => useContactForm('en'));
        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => { } });
        });
        expect(result.current.submitStatus).toBe('error');
    });
}); 