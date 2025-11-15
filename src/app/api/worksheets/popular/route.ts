import { NextResponse } from 'next/server';
import { browseLibraryWorksheets } from '@/lib/services/libraryService';

export const revalidate = 3600; // Cache for 1 hour
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the 12 most popular published worksheets (2 rows of 6)
    const result = await browseLibraryWorksheets({
      sort_by: 'popular', // Sort by download count
      limit: 12,
      offset: 0,
    });

    // Return the worksheets
    return NextResponse.json({
      worksheets: result.worksheets || []
    });

  } catch (error) {
    console.error('Failed to fetch popular worksheets:', error);

    // Return empty array on error rather than mock data
    return NextResponse.json({
      worksheets: [],
      error: 'Failed to load popular worksheets'
    }, { status: 500 });
  }
}