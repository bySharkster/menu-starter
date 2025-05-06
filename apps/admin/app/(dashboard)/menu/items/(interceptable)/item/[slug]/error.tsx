'use client';

import { Button } from '@workspace/ui/components/button';
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
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-background shadow-sm">
      <h2 className="text-xl font-semibold text-foreground">Something went wrong!</h2>
      <pre className="p-3 w-full bg-muted rounded-md overflow-auto text-sm">{error.message}</pre>
      {issues.length > 0 && (
        <div className="w-full">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Validation issues:</h3>
          <ul className="space-y-1 text-sm">
            {issues.map((issue) => (
              <li key={`${issue.path.join('.')}-${issue.message}`} className="p-2 rounded bg-destructive/10 text-destructive">
                <span className="font-medium">{issue.path.join('.')}:</span> {issue.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button 
        type="button" 
        onClick={reset}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Try again
      </Button>
    </div>
  );
}