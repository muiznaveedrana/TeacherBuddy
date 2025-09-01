import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AdBanner, AdMediumRectangle, AdMobile } from '@/components/ads';

// Mock the ad blocker detection for consistent testing
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  value: 100, // Mock non-zero height to simulate no ad blocker
});

describe('Ad Components', () => {
  describe('AdBanner', () => {
    it('renders loading state initially', () => {
      render(<AdBanner />);
      expect(screen.getByText('Loading advertisement...')).toBeInTheDocument();
    });

    it('renders ad content after loading', async () => {
      render(<AdBanner />);
      
      await waitFor(() => {
        expect(screen.getByText('Educational Resources')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Discover teaching materials for your classroom')).toBeInTheDocument();
      expect(screen.getByText('Ad')).toBeInTheDocument();
    });

    it('calls onLoad callback when ad loads', async () => {
      const onLoad = vi.fn();
      render(<AdBanner onLoad={onLoad} />);
      
      await waitFor(() => {
        expect(onLoad).toHaveBeenCalled();
      });
    });

    it('calls onError callback when error occurs', async () => {
      const onError = vi.fn();
      render(<AdBanner onError={onError} />);
      
      // Wait for ad to load first
      await waitFor(() => {
        expect(screen.getByText('Educational Resources')).toBeInTheDocument();
      });
      
      // Click to simulate error
      screen.getByText('Educational Resources').click();
      
      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });

    it('applies custom className', () => {
      const { container } = render(<AdBanner className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('AdMediumRectangle', () => {
    it('renders loading state initially', () => {
      render(<AdMediumRectangle />);
      expect(screen.getByText('Loading ad...')).toBeInTheDocument();
    });

    it('renders ad content after loading', async () => {
      render(<AdMediumRectangle />);
      
      await waitFor(() => {
        expect(screen.getByText('Teaching Supplies')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Premium classroom materials and educational resources for UK teachers')).toBeInTheDocument();
      expect(screen.getByText('Shop Now - Free Delivery')).toBeInTheDocument();
      expect(screen.getByText('Ad')).toBeInTheDocument();
    });

    it('has correct dimensions', async () => {
      const { container } = render(<AdMediumRectangle />);
      
      await waitFor(() => {
        expect(screen.getByText('Teaching Supplies')).toBeInTheDocument();
      });
      
      const adElement = container.firstChild as HTMLElement;
      expect(adElement).toHaveClass('w-[300px]', 'h-[250px]');
    });
  });

  describe('AdMobile', () => {
    it('renders banner variant by default', async () => {
      render(<AdMobile />);
      
      await waitFor(() => {
        expect(screen.getByText('Classroom Tools')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('renders square variant correctly', async () => {
      render(<AdMobile variant="square" />);
      
      await waitFor(() => {
        expect(screen.getByText('Education Apps')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Discover mobile learning tools for teachers and students')).toBeInTheDocument();
      expect(screen.getByText('Download Free')).toBeInTheDocument();
    });

    it('renders large-banner variant correctly', async () => {
      render(<AdMobile variant="large-banner" />);
      
      await waitFor(() => {
        expect(screen.getByText('Teaching Resources')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Free UK curriculum materials')).toBeInTheDocument();
      expect(screen.getByText('Explore')).toBeInTheDocument();
    });

    it('applies correct size classes for each variant', () => {
      const { container: bannerContainer } = render(<AdMobile variant="banner" />);
      const { container: squareContainer } = render(<AdMobile variant="square" />);
      const { container: largeBannerContainer } = render(<AdMobile variant="large-banner" />);
      
      expect(bannerContainer.firstChild).toHaveClass('h-[50px]');
      expect(squareContainer.firstChild).toHaveClass('max-w-[250px]', 'h-[250px]');
      expect(largeBannerContainer.firstChild).toHaveClass('h-[100px]');
    });
  });

  describe('Error Handling', () => {
    it('shows error state when ad fails to load', async () => {
      render(<AdBanner />);
      
      await waitFor(() => {
        expect(screen.getByText('Educational Resources')).toBeInTheDocument();
      });
      
      // Click to simulate error
      screen.getByText('Educational Resources').click();
      
      await waitFor(() => {
        expect(screen.getByText('Advertisement failed to load')).toBeInTheDocument();
      });
    });

    it('shows ad blocker detected state', () => {
      // Mock zero height to simulate ad blocker
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 0,
      });

      render(<AdBanner />);
      
      setTimeout(() => {
        expect(screen.getByText(/Ad blocker detected/)).toBeInTheDocument();
      }, 150);
    });
  });
});