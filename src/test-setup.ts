import { vi } from 'vitest';
import { configure } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';

configure({ testIdAttribute: 'data-test' });

// stub the compoennts out for tests
vi.mock('naive-ui', () => ({
  NSelect: { name: 'NSelect', template: '<div></div>' },
  NButton: { name: 'NButton', template: '<div></div>' },
  useModal: () => ({
    create: vi.fn(),
  }),
  h: vi.fn(),
}));
