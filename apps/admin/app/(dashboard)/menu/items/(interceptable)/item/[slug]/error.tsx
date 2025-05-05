'use client';

import { useEffect } from 'react';
import type { ZodError, ZodIssue } from "zod";

function isZodError(error: unknown): error is ZodError {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as ZodError).issues)
  );
}

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  let issues: ZodIssue[] = [];
  if (isZodError(error)) {
    issues = error.issues;
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      {issues.length > 0 && (
        <ul>
          {issues.map((issue) => (
            <li key={`${issue.path.join('.')}-${issue.message}`}>{issue.path.join('.')}: {issue.message}</li>
))}
        </ul>
      )}
      <button type="button" onClick={reset}>Try again</button>
    </div>
  );
}