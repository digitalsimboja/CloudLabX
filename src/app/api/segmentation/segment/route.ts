import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Receive the S3 file path from the request body
    const { s3FilePath } = await req.json();
    console.log("S3 File Path:", s3FilePath);

    return NextResponse.json({ segmentedRows: [{ name: "John Doe", age: 30, city: "New York" }], columns: ["name", "age", "city"] });
}