
import App from '@/App';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
describe('<App />', () => {
    it('renders without crashing', () => {
        const { container } = render(<App />);
        expect(container).toBeDefined();
    });
}); 