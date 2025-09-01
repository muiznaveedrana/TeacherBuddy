'use client'

import { Users, Plus, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyNameListsProps {
  onCreateNew?: () => void
  onUseDefault?: () => void
  className?: string
}

export function EmptyNameLists({
  onCreateNew,
  onUseDefault,
  className = ""
}: EmptyNameListsProps) {
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="text-center py-12">
        <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No Name Lists Yet
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Create personalized name lists for your classes to make worksheets more engaging for your students.
        </p>

        <div className="space-y-3">
          <Button 
            onClick={onCreateNew}
            className="w-full"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Name List
          </Button>
          
          {onUseDefault && (
            <Button 
              onClick={onUseDefault}
              variant="outline"
              className="w-full"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Use Default UK Names
            </Button>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">
            💡 Why use name lists?
          </p>
          <ul className="text-xs text-blue-700 space-y-1 text-left">
            <li>• Students love seeing their names in problems</li>
            <li>• Increases engagement and attention</li>
            <li>• Makes worksheets feel personalized</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}