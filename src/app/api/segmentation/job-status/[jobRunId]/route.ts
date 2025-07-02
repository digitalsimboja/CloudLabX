import { NextResponse } from "next/server";

// Chalice API configuration
const CHALICE_API_URL = process.env.API_URL || "http://localhost:8000";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jobRunId: string }> }
) {
  try {
    const { jobRunId } = await params;
    
    console.log(`Checking job status for: ${jobRunId}`);

    // Call the Chalice API to get job status
    const response = await fetch(`${CHALICE_API_URL}/job-status/${jobRunId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Chalice API error:", errorData);
      return NextResponse.json(
        { 
          error: errorData.error || "Failed to check job status",
          details: errorData.details,
          type: errorData.type || "server"
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Job status: ${JSON.stringify(data)}`);
    
    // Return the data in the expected format
    return NextResponse.json({
      jobRunId: data.jobRunId,
      status: data.status,
      message: data.message,
      segmentedRows: data.segmentedRows || [],
      columns: data.columns || []
    });

  } catch (error) {
    console.error("Error checking job status:", error);
    return NextResponse.json(
      { 
        error: "Internal server error while checking job status",
        type: "server"
      },
      { status: 500 }
    );
  }
} 