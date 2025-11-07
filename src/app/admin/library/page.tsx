'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { LibraryWorksheet } from '@/lib/types/library'

export default function AdminLibraryPage() {
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchWorksheets()
  }, [searchQuery])

  async function fetchWorksheets() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)

      const response = await fetch(`/api/admin/library?${params}`)
      const data = await response.json()

      if (data.worksheets) {
        setWorksheets(data.worksheets)
      }
    } catch (error) {
      console.error('Failed to fetch worksheets:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handlePublish(id: string) {
    if (!confirm('Publish this worksheet?')) return

    try {
      const response = await fetch(`/api/admin/library/${id}/publish`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchWorksheets()
      }
    } catch (error) {
      console.error('Failed to publish:', error)
      alert('Failed to publish worksheet')
    }
  }

  async function handleUnpublish(id: string) {
    if (!confirm('Unpublish this worksheet?')) return

    try {
      const response = await fetch(`/api/admin/library/${id}/unpublish`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchWorksheets()
      }
    } catch (error) {
      console.error('Failed to unpublish:', error)
      alert('Failed to unpublish worksheet')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this worksheet permanently? This cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/library/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchWorksheets()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete worksheet')
    }
  }

  const filteredWorksheets = worksheets.filter(w => {
    if (statusFilter === 'all') return true
    return w.status === statusFilter
  })

  const stats = {
    total: worksheets.length,
    published: worksheets.filter(w => w.status === 'published').length,
    draft: worksheets.filter(w => w.status === 'draft').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Library Admin
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your worksheet library
              </p>
            </div>
            <Link
              href="/create"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Worksheets</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600">Published</p>
              <p className="mt-1 text-2xl font-semibold text-green-900">{stats.published}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600">Drafts</p>
              <p className="mt-1 text-2xl font-semibold text-yellow-900">{stats.draft}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search worksheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Worksheets Table */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading worksheets...
            </div>
          ) : filteredWorksheets.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No worksheets found
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worksheet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWorksheets.map((worksheet) => (
                  <tr key={worksheet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {worksheet.thumbnail_url && (
                          <img
                            src={worksheet.thumbnail_url}
                            alt=""
                            className="h-12 w-12 rounded object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {worksheet.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {worksheet.year_group} • {worksheet.topic}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {worksheet.status === 'published' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{worksheet.view_count} views</div>
                      <div>{worksheet.download_count} downloads</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(worksheet.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/library/${worksheet.slug}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {worksheet.status === 'draft' ? (
                          <button
                            onClick={() => handlePublish(worksheet.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnpublish(worksheet.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Unpublish
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(worksheet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
