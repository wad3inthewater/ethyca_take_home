import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import DataMap from './DataMap.vue';

it('renders the systems by type', async () => {
  render(DataMap);

  expect(screen.getByText('application')).toBeInTheDocument();
  expect(screen.getByText('service')).toBeInTheDocument();
  expect(screen.getByText('database')).toBeInTheDocument();
  expect(screen.getByText('integration')).toBeInTheDocument();
});
