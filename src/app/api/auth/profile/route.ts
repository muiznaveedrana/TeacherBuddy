import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, isAuthSuccess } from '@/lib/utils/auth'
import { ProfileRepository } from '@/lib/repositories/profiles'
import type { ApiResponse, DbProfile } from '@/lib/types'

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Require authentication
  const authResult = await requireAuth(request)
  if (!isAuthSuccess(authResult)) {
    return authResult
  }

  try {
    const profile = await ProfileRepository.getProfile(authResult.user.id)
    
    if (!profile) {
      return NextResponse.json<ApiResponse>(
        { 
          error: 'Profile not found',
          success: false,
          message: 'User profile does not exist'
        },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse<DbProfile>>(
      { 
        data: profile,
        success: true,
        message: 'Profile retrieved successfully'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json<ApiResponse>(
      { 
        error: 'Internal server error',
        success: false,
        message: 'Failed to retrieve profile'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  // Require authentication
  const authResult = await requireAuth(request)
  if (!isAuthSuccess(authResult)) {
    return authResult
  }

  try {
    const body = await request.json()
    const {
      name,
      country,
      curriculum,
      year_group,
      school,
      teaching_subjects,
      default_name_list
    } = body

    // Validate required fields for profile setup
    if (!country || !curriculum) {
      return NextResponse.json<ApiResponse>(
        { 
          error: 'Validation error',
          success: false,
          message: 'Country and curriculum are required'
        },
        { status: 400 }
      )
    }

    const updates = {
      name,
      country,
      curriculum,
      year_group,
      school,
      teaching_subjects: teaching_subjects || [],
      default_name_list
    }

    const profile = await ProfileRepository.updateProfile(authResult.user.id, updates)
    
    if (!profile) {
      return NextResponse.json<ApiResponse>(
        { 
          error: 'Update failed',
          success: false,
          message: 'Failed to update profile'
        },
        { status: 500 }
      )
    }

    return NextResponse.json<ApiResponse<DbProfile>>(
      { 
        data: profile,
        success: true,
        message: 'Profile updated successfully'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile update API error:', error)
    return NextResponse.json<ApiResponse>(
      { 
        error: 'Internal server error',
        success: false,
        message: 'Failed to update profile'
      },
      { status: 500 }
    )
  }
}