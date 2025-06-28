"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../../../../components/Navbar";
import Footer from "../../../../../components/Footer";
import { Upload, Download } from "lucide-react";

export default function CustomerSegmentationLab() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [segmentReady, setSegmentReady] = useState(false);
  const [segmentedData, setSegmentedData] = useState<any[]>([]);
  const [segmentedColumns, setSegmentedColumns] = useState<string[]>([]);
  const [s3FilePath, setS3FilePath] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/segmentation/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPreviewData(data.previewRows);
    setColumns(data.columns);
    setSegmentReady(true);
    setUploading(false);
    setS3FilePath(data.s3FilePath);
  };

  const handleSegmentation = async () => {
    if (!s3FilePath) return;
    setIsReady(true);
  
    const res = await fetch("/api/segmentation/segment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ s3FilePath }),
    });
  
    const data = await res.json();
  
    if (data) {
      setIsReady(false);
      setSegmentedData(data.segmentedRows);
      setSegmentedColumns(data.columns);
    }
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
            This lab demonstrates how data-driven companies can intelligently
            segment any type of data intelligently.
          </p>

          <div className="text-left bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-3">
              🔧 How It Was Crafted
            </h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Upload raw customer data (.csv or .xlsx)</li>
              <li>
                Data is stored securely in S3 and passed to AWS Glue for schema
                inference
              </li>
              <li>
                A Lambda function invokes Amazon Bedrock to suggest segmentation
                categories
              </li>
              <li>
                Segmented categories are used to prompt Bedrock to generate a
                Glue script for data segmentation
              </li>
              <li>
                Generated Glue script is stored in S3 which triggers another
                Glue job to segment the data
              </li>
              <li>
                Final segmented data is stored in S3 and can be queried using
                Athena
              </li>
              <li>
                You can preview the first 10 rows of the segmented dataset
              </li>
              <li>
                You can also download or export the full segmented data set
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6 mb-3">
              🚀 Tech Stack
            </h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>
                <strong>Frontend:</strong> Next.js, TailwindCSS, Lucide Icons,
                AWS SDK
              </li>
              <li>
                <strong>Backend:</strong> AWS Lambda, Amazon S3, AWS Glue,
                Amazon Bedrock
              </li>
              <li>
                <strong>Language:</strong> TypeScript & Python
              </li>
            </ul>
          </div>
        </div>

        {/* Upload Interface */}
        <div className="max-w-3xl mx-auto bg-dark-800 p-6 rounded-xl border border-gray-700 mt-12">
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

        {segmentReady && (
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

            <div className="text-right mt-6">
              <button
                onClick={handleSegmentation}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {isReady ? "Running Segmentation..." : "Segment Data"}
              </button>
            </div>
          </section>
        )}

        {segmentedData.length > 0 && (
          <section className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Segmented Results
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
              <button
                onClick={() => window.open("/api/export", "_blank")}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download (.csv)
              </button>
            </div>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}
