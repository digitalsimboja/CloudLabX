import { NextResponse } from "next/server";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({
    region: process.env.AWS_REGION || "eu-west-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: Request) {
    try {
        console.log("Categorizing data...");
        // Receive the S3 file path from the request body
        const { s3FilePath } = await req.json();
        console.log("S3 File Path:", s3FilePath);

        if (!s3FilePath) {
            return NextResponse.json(
                { error: "S3 file path is required" },
                { status: 400 }
            );
        }

        // Get Lambda function name from environment variable
        const lambdaFunctionName = process.env.CATEGORIZATION_LAMBDA_FUNCTION_NAME;
        
        if (!lambdaFunctionName) {
            console.error("CATEGORIZATION_LAMBDA_FUNCTION_NAME environment variable is not set");
            return NextResponse.json(
                { error: "Lambda function configuration error" },
                { status: 500 }
            );
        }

        console.log("Invoking Lambda function:", lambdaFunctionName);

        // Prepare payload for Lambda function
        const payload = {
            s3FilePath: s3FilePath,
            operation: "categorize"
        };

        // Invoke Lambda function
        const command = new InvokeCommand({
            FunctionName: lambdaFunctionName,
            Payload: JSON.stringify(payload),
            InvocationType: "RequestResponse",
        });

        const response = await lambda.send(command);
        
        if (response.StatusCode !== 200) {
            console.error("Lambda invocation failed with status:", response.StatusCode);
            return NextResponse.json(
                { error: "Lambda function invocation failed" },
                { status: 500 }
            );
        }

        // Parse the response payload
        const responsePayload = JSON.parse(new TextDecoder().decode(response.Payload));
        
        if (responsePayload.errorMessage) {
            console.error("Lambda function error:", responsePayload.errorMessage);
            return NextResponse.json(
                { error: "Lambda function execution failed", details: responsePayload.errorMessage },
                { status: 500 }
            );
        }

        console.log("Categorization completed successfully");
        
        // Return the categorized data in the expected format
        return NextResponse.json({
            segmentedRows: responsePayload.categorizedRows || responsePayload.data || [],
            columns: responsePayload.columns || []
        });

    } catch (error) {
        console.error("Error during categorization:", error);
        return NextResponse.json(
            { error: "Internal server error during categorization" },
            { status: 500 }
        );
    }
}