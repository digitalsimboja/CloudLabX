import { NextResponse } from "next/server";

// Chalice API configuration
const CHALICE_API_URL = process.env.NEXT_PUBLIC_CHALICE_API_URL || "http://localhost:8000";

export async function POST(req: Request) {
    try {
        // Receive the S3 file path from the request body
        const { s3FilePath } = await req.json();
        console.log("S3 File Path:", s3FilePath);

        if (!s3FilePath) {
            return NextResponse.json(
                { error: "S3 file path is required" },
                { status: 400 }
            );
        }

        // Call the Chalice API segment endpoint
        const response = await fetch(`${CHALICE_API_URL}/segment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ s3FilePath }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Chalice API error:", errorData);
            return NextResponse.json(
                { 
                    error: errorData.error || "Chalice API call failed",
                    details: errorData.details,
                    type: errorData.type || "server"
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log(`Segmentation job started successfully: ${JSON.stringify(data)}`);
        
        // Return the data in the expected format
        return NextResponse.json({
            jobRunId: data.jobRunId,
            status: data.status,
            message: data.message,
            segmentedRows: data.segmentedRows || [],
            columns: data.columns || []
        });

    } catch (error) {
        console.error("Error during segmentation:", error);
        return NextResponse.json(
            { 
                error: "Internal server error during segmentation",
                type: "server"
            },
            { status: 500 }
        );
    }
}