import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import DashboardPage from '@/app/dashboard/page'

// Mock the WelcomeTour component to prevent it from interfering with tests
vi.mock('@/components/WelcomeTour', () => ({
  default: function MockWelcomeTour({ onComplete }: { onComplete: () => void }) {
    return null // Don't render anything in tests
  }
}))

describe('Worksheet Generation Interface', () => {
  beforeEach(() => {
    render(<DashboardPage />)
  })

  describe('Layout and Structure', () => {
    it('renders the main worksheet generation interface', () => {
      expect(screen.getByText('Worksheet Configuration')).toBeInTheDocument()
      expect(screen.getByText('Configure your worksheet settings and generate personalized content for your students')).toBeInTheDocument()
    })

    it('displays navigation breadcrumb', () => {
      expect(screen.getByText('Worksheet Generator')).toBeInTheDocument()
    })

    it('shows the two-column layout on desktop', () => {
      const configPanel = screen.getByText('Worksheet Configuration').closest('.lg\\:col-span-7')
      expect(configPanel).toBeInTheDocument()
    })
  })

  describe('Configuration Panel', () => {
    it('renders all form controls', () => {
      expect(screen.getByText('Topic')).toBeInTheDocument()
      expect(screen.getByText('Subtopic')).toBeInTheDocument()
      expect(screen.getByText('Difficulty Level')).toBeInTheDocument()
      expect(screen.getByText(/Number of Questions:/)).toBeInTheDocument()
      expect(screen.getByText('Year Group')).toBeInTheDocument()
      expect(screen.getByText('Student Name List')).toBeInTheDocument()
    })

    it('has topic dropdown with placeholder', () => {
      const topicSelect = screen.getByText('Select a curriculum topic')
      expect(topicSelect).toBeInTheDocument()
    })

    it('subtopic dropdown is disabled initially', () => {
      const subtopicTrigger = screen.getByText('Select topic first')
      expect(subtopicTrigger).toBeInTheDocument()
    })

    it('renders difficulty radio buttons', () => {
      expect(screen.getByRole('radio', { name: /Easy/i })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: /Average/i })).toBeInTheDocument()
      expect(screen.getByRole('radio', { name: /Hard/i })).toBeInTheDocument()
    })

    it('has question count slider with default value', () => {
      const slider = screen.getByRole('slider')
      expect(slider).toHaveValue('15')
    })

    it('renders name list selector with create button', () => {
      expect(screen.getByText('Select a name list')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Create New/i })).toBeInTheDocument()
    })

    it('shows info tooltip for name list', () => {
      const infoIcon = screen.getByRole('button', { name: /info/i })
      expect(infoIcon).toBeInTheDocument()
    })

    it('renders year group selector with default value', () => {
      expect(screen.getByText('Year Group')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Year 3 (Ages 7-8)')).toBeInTheDocument()
    })

    it('shows year group tooltip explaining importance', () => {
      const tooltipTriggers = screen.getAllByRole('button')
      const yearGroupTooltip = tooltipTriggers.find(btn => 
        btn.closest('div')?.previousElementSibling?.textContent?.includes('Year Group')
      )
      expect(yearGroupTooltip).toBeInTheDocument()
    })
  })

  describe('Interactive Behavior', () => {
    it('enables subtopic dropdown when topic is selected', async () => {
      const user = userEvent.setup()
      
      // Click topic dropdown
      const topicTrigger = screen.getByText('Select a curriculum topic')
      await user.click(topicTrigger)
      
      // Select a topic
      const topicOption = screen.getByText('Number and Operations')
      await user.click(topicOption)
      
      // Wait for subtopic to become available
      await waitFor(() => {
        expect(screen.getByText('Select a subtopic')).toBeInTheDocument()
      })
    })

    it('updates question count when slider is moved', async () => {
      const user = userEvent.setup()
      const slider = screen.getByRole('slider')
      
      fireEvent.change(slider, { target: { value: '20' } })
      
      expect(screen.getByText('Number of Questions: 20')).toBeInTheDocument()
    })

    it('updates difficulty when radio button is selected', async () => {
      const user = userEvent.setup()
      const hardRadio = screen.getByRole('radio', { name: /Hard/i })
      
      await user.click(hardRadio)
      
      expect(hardRadio).toBeChecked()
    })

    it('updates year group when dropdown selection changes', async () => {
      const user = userEvent.setup()
      
      // Click year group dropdown
      const yearGroupTrigger = screen.getByDisplayValue('Year 3 (Ages 7-8)')
      await user.click(yearGroupTrigger)
      
      // Select different year group
      const year5Option = screen.getByText('Year 5 (Ages 9-10)')
      await user.click(year5Option)
      
      // Verify year group changed
      await waitFor(() => {
        expect(screen.getByDisplayValue('Year 5 (Ages 9-10)')).toBeInTheDocument()
      })
    })
  })

  describe('Generation State Management', () => {
    it('generate button is disabled initially', () => {
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      expect(generateButton).toBeDisabled()
    })

    it('shows ad placeholder initially', () => {
      expect(screen.getByText('Advertisement')).toBeInTheDocument()
      expect(screen.getByText('Support free worksheets')).toBeInTheDocument()
      expect(screen.getByText('Upgrade to Pro to remove ads')).toBeInTheDocument()
    })

    it('enables generate button when all required fields are filled', async () => {
      const user = userEvent.setup()
      
      // Fill topic
      const topicTrigger = screen.getByText('Select a curriculum topic')
      await user.click(topicTrigger)
      await user.click(screen.getByText('Number and Operations'))
      
      // Fill subtopic
      await waitFor(() => screen.getByText('Select a subtopic'))
      const subtopicTrigger = screen.getByText('Select a subtopic')
      await user.click(subtopicTrigger)
      await user.click(screen.getByText('Addition and Subtraction'))
      
      // Fill name list
      const nameListTrigger = screen.getByText('Select a name list')
      await user.click(nameListTrigger)
      await user.click(screen.getByText('Year 3 Class A (25 students)'))
      
      // Check generate button is enabled
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      await waitFor(() => {
        expect(generateButton).toBeEnabled()
      })
    })
  })

  describe('Generation Workflow', () => {
    beforeEach(async () => {
      const user = userEvent.setup()
      
      // Setup complete configuration
      const topicTrigger = screen.getByText('Select a curriculum topic')
      await user.click(topicTrigger)
      await user.click(screen.getByText('Number and Operations'))
      
      await waitFor(() => screen.getByText('Select a subtopic'))
      const subtopicTrigger = screen.getByText('Select a subtopic')
      await user.click(subtopicTrigger)
      await user.click(screen.getByText('Addition and Subtraction'))
      
      const nameListTrigger = screen.getByText('Select a name list')
      await user.click(nameListTrigger)
      await user.click(screen.getByText('Year 3 Class A (25 students)'))
    })

    it('shows generation progress when generate is clicked', async () => {
      const user = userEvent.setup()
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      
      await user.click(generateButton)
      
      expect(screen.getByText('Generating your worksheet...')).toBeInTheDocument()
      expect(screen.getByText('Creating curriculum-aligned questions with personalized student names')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('shows worksheet preview after generation completes', async () => {
      const user = userEvent.setup()
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      
      await user.click(generateButton)
      
      // Wait for generation to complete (mock timing)
      await waitFor(() => {
        expect(screen.getByText('Mathematics Worksheet')).toBeInTheDocument()
      }, { timeout: 8000 })
      
      expect(screen.getByText('Number and Operations - Addition and Subtraction')).toBeInTheDocument()
      expect(screen.getByText('Difficulty: average | 15 questions')).toBeInTheDocument()
    })

    it('shows download button after generation completes', async () => {
      const user = userEvent.setup()
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      
      await user.click(generateButton)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Download PDF/i })).toBeInTheDocument()
      }, { timeout: 8000 })
    })

    it('changes button to regenerate after completion', async () => {
      const user = userEvent.setup()
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      
      await user.click(generateButton)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Regenerate/i })).toBeInTheDocument()
      }, { timeout: 8000 })
    })

    it('resets to idle state when configuration is changed', async () => {
      const user = userEvent.setup()
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      
      // Generate worksheet
      await user.click(generateButton)
      await waitFor(() => screen.getByText('Mathematics Worksheet'), { timeout: 8000 })
      
      // Change difficulty
      const hardRadio = screen.getByRole('radio', { name: /Hard/i })
      await user.click(hardRadio)
      
      // Should return to idle state with ads
      expect(screen.getByText('Advertisement')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Generate Worksheet/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('slider')).toHaveAccessibleName(/Number of Questions/i)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      const configTitle = screen.getByRole('heading', { name: /Worksheet Configuration/i })
      expect(configTitle).toBeInTheDocument()
    })

    it('form controls have associated labels', () => {
      expect(screen.getByLabelText(/Topic/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Subtopic/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Number of Questions/i)).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies proper CSS classes for responsive layout', () => {
      const mainGrid = screen.getByText('Worksheet Configuration').closest('[class*="grid"]')
      expect(mainGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-10')
    })

    it('difficulty buttons stack on mobile', () => {
      const difficultyContainer = screen.getByText('Easy').closest('[class*="flex"]')
      expect(difficultyContainer).toHaveClass('flex-col', 'sm:flex-row')
    })
  })

  describe('Error Handling', () => {
    it('handles missing configuration gracefully', () => {
      const generateButton = screen.getByRole('button', { name: /Generate Worksheet/i })
      expect(generateButton).toBeDisabled()
    })

    it('shows appropriate placeholder text for disabled fields', () => {
      expect(screen.getByText('Select topic first')).toBeInTheDocument()
    })
  })
})