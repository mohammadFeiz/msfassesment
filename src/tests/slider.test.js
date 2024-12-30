import { render, screen } from '@testing-library/react';
import Slider from './../components/slider/index.tsx';

const mockCards = [
  { title: 'Card 1', subtitle: '', description: '' },
  { title: 'Card 2', subtitle: '', description: '' },
  { title: 'Card 3', subtitle: '', description: '' },
];

describe('Slider Component', () => {
  it('auto move 3 seconds', async () => {
    jest.useFakeTimers();
    render(<Slider cards={mockCards} />);
    
    expect(screen.getByText('Exploring the World')).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    expect(screen.getByText('Mastering Technology')).toBeInTheDocument();
  });

  it('loop to first after last', () => {
    jest.useFakeTimers();
    render(<Slider cards={mockCards} />);
    
    jest.advanceTimersByTime(30000);
    expect(screen.getByText('Exploring the World')).toBeInTheDocument();
  });
});