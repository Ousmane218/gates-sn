import { renderHook, act } from '@testing-library/react-hooks';
import { useNewsletter } from '../useNewsletter';

describe('useNewsletter', () => {
    it('should update email on input change', () => {
        const { result } = renderHook(() => useNewsletter());
        act(() => {
            result.current.handleEmailChange({ target: { value: 'test@example.com' } });
        });
        expect(result.current.email).toBe('test@example.com');
    });

    it('should subscribe with valid email', () => {
        const { result } = renderHook(() => useNewsletter());
        act(() => {
            result.current.handleEmailChange({ target: { value: 'test@example.com' } });
            result.current.handleSubscribe({ preventDefault: () => { } });
        });
        expect(result.current.isSubscribed).toBe(true);
    });
}); 