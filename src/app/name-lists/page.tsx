'use client'

import { useState } from 'react'
import { Navigation } from '@/components/ui/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Users, 
  Download, 
  Info
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface NameList {
  id: string
  title: string
  names: string[]
  createdAt: string
  updatedAt: string
}

interface NameListFormData {
  title: string
  names: string[]
  bulkNames: string
}

const defaultUKNames = [
  'Emma', 'Oliver', 'Ava', 'George', 'Isla', 'Noah', 'Sophia', 'Leo', 'Lily', 'Arthur',
  'Grace', 'Oscar', 'Freya', 'Archie', 'Charlotte', 'Jack', 'Amelia', 'Harry', 'Emily', 'Henry'
]

const mockNameLists: NameList[] = [
  {
    id: '1',
    title: 'Year 3 Class A',
    names: ['Emma', 'Oliver', 'Ava', 'George', 'Isla', 'Noah', 'Sophia', 'Leo', 'Lily', 'Arthur', 'Grace', 'Oscar', 'Freya', 'Archie', 'Charlotte', 'Jack', 'Amelia', 'Harry', 'Emily', 'Henry', 'Mia', 'William', 'Poppy', 'James', 'Isabella'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Year 4 Maths Group',
    names: ['Sophie', 'Thomas', 'Chloe', 'Alexander', 'Jessica', 'Benjamin', 'Lucy', 'Samuel', 'Olivia', 'Daniel', 'Hannah', 'Matthew', 'Ella', 'Jacob', 'Grace', 'Ethan', 'Zoe', 'Ryan'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Reception Class',
    names: ['Alfie', 'Ruby', 'Charlie', 'Evie', 'Max', 'Daisy', 'Freddie', 'Rosie', 'Teddy', 'Phoebe', 'Archie', 'Violet', 'Finley', 'Willow', 'Sebastian', 'Ivy', 'Jasper', 'Maisie', 'Felix', 'Luna'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  }
]

export default function NameListsPage() {
  const [nameLists, setNameLists] = useState<NameList[]>(mockNameLists)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingList, setEditingList] = useState<NameList | null>(null)
  const [deletingList, setDeletingList] = useState<NameList | null>(null)
  const [formData, setFormData] = useState<NameListFormData>({
    title: '',
    names: [],
    bulkNames: ''
  })

  const filteredLists = nameLists.filter(list =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.names.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const resetForm = () => {
    setFormData({
      title: '',
      names: [],
      bulkNames: ''
    })
  }

  const handleCreateList = () => {
    setEditingList(null)
    resetForm()
    setIsCreateModalOpen(true)
  }

  const handleEditList = (list: NameList) => {
    setEditingList(list)
    setFormData({
      title: list.title,
      names: list.names,
      bulkNames: list.names.join('\n')
    })
    setIsCreateModalOpen(true)
  }

  const handleSaveList = () => {
    let finalNames = formData.names

    if (formData.bulkNames.trim()) {
      finalNames = formData.bulkNames
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0)
    }

    if (!formData.title.trim() || finalNames.length < 5) {
      alert('Please provide a title and at least 5 names')
      return
    }

    const newList: NameList = {
      id: editingList ? editingList.id : Date.now().toString(),
      title: formData.title.trim(),
      names: finalNames,
      createdAt: editingList ? editingList.createdAt : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    if (editingList) {
      setNameLists(prev => prev.map(list => list.id === editingList.id ? newList : list))
    } else {
      setNameLists(prev => [...prev, newList])
    }

    setIsCreateModalOpen(false)
    resetForm()
  }

  const handleDeleteList = (list: NameList) => {
    setDeletingList(list)
  }

  const confirmDeleteList = () => {
    if (deletingList) {
      setNameLists(prev => prev.filter(list => list.id !== deletingList.id))
      setDeletingList(null)
    }
  }


  const loadDefaultNames = () => {
    setFormData(prev => ({
      ...prev,
      names: [...defaultUKNames],
      bulkNames: defaultUKNames.join('\n')
    }))
  }

  const exportNameList = (list: NameList) => {
    const csvContent = `Name\n${list.names.join('\n')}`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${list.title.replace(/[^a-zA-Z0-9]/g, '_')}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        <Navigation 
          usage={{ current: 15, limit: 30, tier: 'Free' }}
          onNavigate={(path) => {
            console.log(`Navigate to: ${path}`)
          }}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Name Lists</h1>
                <p className="text-slate-600 mt-1">
                  Create and manage student name lists for personalized worksheets
                </p>
              </div>
              <Button onClick={handleCreateList} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New List
              </Button>
            </div>

            {/* Info Tooltip */}
            <div className="flex items-center gap-2 mb-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-600">
                    <Info className="h-4 w-4" />
                    How names are used
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-sm">
                    Names from your selected list will be automatically inserted into worksheet questions 
                    to make them more engaging and personalized for your students.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search name lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          {/* Name Lists Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLists.map((list) => (
              <Card key={list.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {list.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4" />
                        {list.names.length} names
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Updated {new Date(list.updatedAt).toLocaleDateString('en-GB')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">Names preview:</p>
                    <div className="flex flex-wrap gap-1">
                      {list.names.slice(0, 6).map((name, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                      {list.names.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{list.names.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditList(list)}
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportNameList(list)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Export
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteList(list)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchQuery ? 'No matching name lists' : 'No name lists yet'}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first name list to get started with personalized worksheets'
                }
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateList} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First List
                </Button>
              )}
            </div>
          )}
        </main>

        {/* Create/Edit Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingList ? 'Edit Name List' : 'Create New Name List'}
              </DialogTitle>
              <DialogDescription>
                Create a list of student names to personalize your worksheets. 
                You need at least 5 names to create a list.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">List Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Year 3 Class A"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Bulk Import Option */}
              <div className="space-y-2">
                <Label htmlFor="bulkNames">Names (one per line)</Label>
                <Textarea
                  id="bulkNames"
                  placeholder="Enter names, one per line..."
                  value={formData.bulkNames}
                  onChange={(e) => setFormData(prev => ({ ...prev, bulkNames: e.target.value }))}
                  rows={8}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                    {formData.bulkNames ? formData.bulkNames.split('\n').filter(n => n.trim()).length : 0} names
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadDefaultNames}
                  >
                    Load UK Default Names
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveList}>
                {editingList ? 'Update List' : 'Create List'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingList} onOpenChange={() => setDeletingList(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Name List</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{deletingList?.title}&quot;? 
                This action cannot be undone and will remove {deletingList?.names.length} names.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteList}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete List
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  )
}