"use client";

import React from "react";
import { AlertTriangle, RefreshCw, X, Info, AlertCircle } from "lucide-react";

export interface ErrorDisplayProps {
  error: {
    message: string;
    details?: string;
    code?: string;
    type?: "lambda" | "network" | "validation" | "server" | "unknown";
  };
  onRetry?: () => void;
  onDismiss?: () => void;
  showDismiss?: boolean;
  className?: string;
}

const getErrorIcon = (type?: string) => {
  switch (type) {
    case "lambda":
      return <AlertTriangle className="w-6 h-6 text-red-400" />;
    case "network":
      return <AlertCircle className="w-6 h-6 text-yellow-400" />;
    case "validation":
      return <Info className="w-6 h-6 text-blue-400" />;
    case "server":
      return <AlertTriangle className="w-6 h-6 text-red-400" />;
    default:
      return <AlertTriangle className="w-6 h-6 text-red-400" />;
  }
};

const getErrorColor = (type?: string) => {
  switch (type) {
    case "lambda":
      return "border-red-500/20 bg-red-500/10";
    case "network":
      return "border-yellow-500/20 bg-yellow-500/10";
    case "validation":
      return "border-blue-500/20 bg-blue-500/10";
    case "server":
      return "border-red-500/20 bg-red-500/10";
    default:
      return "border-red-500/20 bg-red-500/10";
  }
};

const getErrorMessage = (type: string | undefined, message: string) => {
  switch (type) {
    case "lambda":
      return `Lambda Function Error: ${message}`;
    case "network":
      return `Network Error: ${message}`;
    case "validation":
      return `Validation Error: ${message}`;
    case "server":
      return `Server Error: ${message}`;
    default:
      return message;
  }
};

export default function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  showDismiss = true,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${getErrorColor(error.type)} ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getErrorIcon(error.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-200">
            {getErrorMessage(error.type, error.message)}
          </h3>
          
          {error.details && (
            <p className="mt-1 text-sm text-gray-400">
              {error.details}
            </p>
          )}
          
          {error.code && (
            <p className="mt-1 text-xs text-gray-500 font-mono">
              Error Code: {error.code}
            </p>
          )}
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </button>
          )}
        </div>
        
        {showDismiss && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Specialized error components for common scenarios
export function LambdaErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss 
}: Omit<ErrorDisplayProps, 'error'> & { error: string }) {
  return (
    <ErrorDisplay
      error={{
        message: error,
        type: "lambda",
        details: "The Lambda function may not exist or may have configuration issues. Please check your AWS credentials and function name."
      }}
      onRetry={onRetry}
      onDismiss={onDismiss}
    />
  );
}

export function NetworkErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss 
}: Omit<ErrorDisplayProps, 'error'> & { error: string }) {
  return (
    <ErrorDisplay
      error={{
        message: error,
        type: "network",
        details: "Please check your internet connection and try again."
      }}
      onRetry={onRetry}
      onDismiss={onDismiss}
    />
  );
}

export function ValidationErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss 
}: Omit<ErrorDisplayProps, 'error'> & { error: string }) {
  return (
    <ErrorDisplay
      error={{
        message: error,
        type: "validation",
        details: "Please check your input and try again."
      }}
      onRetry={onRetry}
      onDismiss={onDismiss}
    />
  );
} 