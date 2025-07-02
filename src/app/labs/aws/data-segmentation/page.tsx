"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../../../../components/Navbar";
import Footer from "../../../../../components/Footer";
import ErrorDisplay, { LambdaErrorDisplay, NetworkErrorDisplay } from "../../../../../components/ErrorDisplay";
import { Upload, Download } from "lucide-react";

export default function DataSegmentationLab() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [segmentReady, setSegmentReady] = useState(false);
  const [segmentedData, setSegmentedData] = useState<any[]>([]);
  const [endpoint, setEndpoint] = useState<"segment" | "categorize">("categorize");
  const [segmentedColumns, setSegmentedColumns] = useState<string[]>([]);
  const [s3FilePath, setS3FilePath] = useState<string>("");
  const [approach, setApproach] = useState<"manual" | "auto">("manual");
  const [error, setError] = useState<{
    message: string;
    type: "lambda" | "network" | "validation" | "server" | "unknown";
    details?: string;
  } | null>(null);
  const [jobRunId, setJobRunId] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/segmentation/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await res.json();
      setPreviewData(data.previewRows);
      setColumns(data.columns);
      setSegmentReady(true);
      setS3FilePath(data.s3FilePath);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Upload failed",
        type: "network",
        details: "Please check your file and try again."
      });
    } finally {
      setUploading(false);
    }
  };

  const handleProcessing = async (endpoint: "segment" | "categorize") => {
    if (!s3FilePath) return;
    setIsReady(true);
    setError(null);

    setEndpoint(endpoint);

    try {
      const res = await fetch(`/api/segmentation/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ s3FilePath }),
      });


      if (!res.ok) {
        const errorData = await res.json();
        const errorType = errorData.type || (errorData.error?.includes("Lambda") ? "lambda" : "server");
        throw new Error(errorData.error || `${endpoint} failed`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Handle Glue job response
      if (data.jobRunId) {
        setJobRunId(data.jobRunId);
        setJobStatus(data.status);

        // Start polling for job status
        pollJobStatus(data.jobRunId, endpoint);
      } else {
        // Direct response (for immediate results)
        setSegmentedData(data.segmentedRows);
        setSegmentedColumns(data.columns);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `${endpoint} failed`;
      setError({
        message: errorMessage,
        type: errorMessage.includes("Lambda") ? "lambda" : "server",
        details: errorMessage.includes("Lambda") 
          ? "The Lambda function may not exist or may have configuration issues. Please check your AWS credentials and function name."
          : "Please try again or contact support if the problem persists."
      });
    } finally {
      setIsReady(false);
    }
  };

  const pollJobStatus = async (jobId: string, endpoint: string) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const poll = async () => {
      try {
        const res = await fetch(`/api/segmentation/job-status/${jobId}`);
        
        if (!res.ok) {
          throw new Error("Failed to check job status");
        }

        const data = await res.json();
        setJobStatus(data.status);

        if (data.status === "SUCCEEDED") {
          setSegmentedData(data.segmentedRows);
          setSegmentedColumns(data.columns);
          setJobRunId("");
          setJobStatus("");
          return;
        } else if (data.status === "FAILED" || data.status === "STOPPED" || data.status === "TIMEOUT") {
          setError({
            message: `Job ${data.status.toLowerCase()}`,
            type: "server",
            details: data.details || "Job execution failed"
          });
          setJobRunId("");
          setJobStatus("");
          return;
        }

        // Continue polling
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        } else {
          setError({
            message: "Job timeout",
            type: "server",
            details: "Job took too long to complete"
          });
          setJobRunId("");
          setJobStatus("");
        }
      } catch (err) {
        setError({
          message: "Failed to check job status",
          type: "network",
          details: "Unable to check job progress"
        });
        setJobRunId("");
        setJobStatus("");
      }
    };

    poll();
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <section className="min-h-screen bg-dark-900 text-gray-100 px-4 py-10">
        <div className="max-w-5xl mx-auto text-center mb-12 mt-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Data Segmentation
          </h1>
          <p className="text-gray-400 text-md md:text-lg mb-6">
            Choose your preferred orchestration approach to explore the data
            segmentation process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div
              onClick={() => setApproach("manual")}
              className={`cursor-pointer p-6 rounded-xl border transition ${
                approach === "manual"
                  ? "border-indigo-500 bg-dark-700"
                  : "border-gray-700 bg-dark-800"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                Manual Orchestration
              </h3>
              <p className="text-sm text-gray-400">
                Upload data and manually invoke data categorization and segmentation. Suitable for
                user-guided workflows.
              </p>
            </div>

            <div
              onClick={() => setApproach("auto")}
              className={`cursor-pointer p-6 rounded-xl border transition ${
                approach === "auto"
                  ? "border-green-500 bg-dark-700"
                  : "border-gray-700 bg-dark-800"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                Event-Driven Orchestration
              </h3>
              <p className="text-sm text-gray-400">
                Let S3 events trigger Glue jobs automatically when new files are
                uploaded to S3. Suitable for automated workflows.
              </p>
            </div>
          </div>


          {approach === "manual" && (
            <div className="text-left bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">
                Manual Orchestration Flows
              </h2>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Upload raw customer data (.csv or .xlsx)</li>
                <li>Store data in S3 and user calls categorize which runs a Glue job to sample schema</li>
                <li>
                  Glue calls Bedrock via Lambda to generate category suggestions and Glue script
                </li>
                <li>Render suggestions to user and store Glue script to S3</li>
                <li>Upon user confirmation, trigger segmenation Glue job</li>
              </ul>
            </div>
          )}

          {approach === "auto" && (
            <div className="text-left bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Event-Driven Flow</h2>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>
                  Upload data to a special S3 bucket (e.g. <code>uploads/</code>
                  )
                </li>
                <li>S3 triggers Lambda function</li>
                <li>Lambda starts Glue Job A to sample and invoke Bedrock</li>
                <li>Generated categories + scripts are stored in S3</li>
                <li>User accepts categories, which triggers final Glue job to segment data</li>
              </ul>
            </div>
          )}
        </div>

        {approach === "auto" && segmentReady && (
          <div className="text-right mt-6">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Running Segmentation...
            </button>
          </div>
        )}

        {/* Upload Interface */}
        <div className="max-w-5xl mx-auto bg-dark-800 p-6 rounded-xl border border-gray-700 mt-12">
          <label className="block text-left text-sm font-medium mb-2">
            Upload CSV/XLSX File
          </label>
          <div className="w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-indigo-500 rounded-lg cursor-pointer bg-dark-800 hover:bg-dark-700 transition text-gray-300"
            >
              <Upload className="w-6 h-6 mb-2 text-indigo-400" />
              <span className="font-semibold">Click to upload</span>
              <span className="text-sm text-gray-400 mt-1">
                CSV or XLSX (max 10MB)
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={handleFileChange}
            />

            {file && (
              <div className="mt-3 text-sm text-indigo-300 truncate">
                <span className="text-white text-semibold">
                  {" "}
                  Selected File:
                </span>{" "}
                <span className="font-medium">{file.name}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload & Preview
              </>
            )}
          </button>
        </div>


        {/* Data Preview */}
        {previewData.length > 0 && (
          <section className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Data Preview
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full text-sm text-gray-300">
                <thead className="bg-dark-700">
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx} className="py-2 px-3 text-left font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="py-2 px-3 border-b border-r border-gray-700 last:border-r-0"
                    >
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="py-2 px-3 border-b border-r border-gray-700 last:border-r-0"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {approach === "manual" && (
              <div className="text-right mt-6">
                <button
                  onClick={() => handleProcessing("categorize")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  {isReady ? "Running Categorization..." : "Categorize Data"}
                </button>
              </div>
            )}
          </section>
        )}

         {/* Error Display */}
         {error && (
          <div className="max-w-5xl mx-auto mt-6">
            <ErrorDisplay
              error={error}
              onRetry={() => {
                setError(null);
                if (endpoint === "categorize") {
                  handleProcessing("categorize");
                } else if (endpoint === "segment") {
                  handleProcessing("segment");
                } else {
                  handleUpload();
                }
              }}
              onDismiss={() => setError(null)}
            />
          </div>
        )}

        {/* Job Status Display */}
        {jobRunId && jobStatus && (
          <div className="max-w-5xl mx-auto mt-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-200">
                    {endpoint === "categorize" ? "Categorizing Data" : "Segmenting Data"}
                  </h3>
                  <p className="text-sm text-blue-300 mt-1">
                    Job Status: {jobStatus} | ID: {jobRunId.substring(0, 20)}...
                  </p>
                  <p className="text-xs text-blue-400 mt-1">
                    This may take a few minutes. We'll automatically update when complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Segmented Data */}
        {segmentedData.length > 0 && (
          <section className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              {endpoint === "segment" ? "Segmented Results" : "Categorized Results"}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full text-sm text-gray-300">
                <thead className="bg-dark-700">
                  <tr>
                    {segmentedColumns.map((col, idx) => (
                      <th key={idx} className="py-2 px-3 text-left font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {segmentedData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-dark-800">
                      {segmentedColumns.map((col, colIndex) => (
                        <td key={colIndex} className="py-2 px-3">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-6">
              {endpoint === "categorize" ? (
                <button
                  onClick={() => handleProcessing("segment")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  {isReady ? "Running Segmentation..." : "Segment Data"}
                </button>
              ) : (
                <button
                  onClick={() => window.open("/api/export", "_blank")}
                  className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download (.csv)
                </button>
              )}
            </div>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
