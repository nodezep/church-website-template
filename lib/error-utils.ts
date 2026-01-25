/**
 * Error logging utility for better debugging
 */

export function formatError(error: any): string {
  if (!error) return "Unknown error"

  // If it's a string, return as-is
  if (typeof error === "string") return error

  // If it's an Error object or Supabase error object
  if (error instanceof Error) {
    return error.message
  }

  // Handle Supabase error objects
  if (error.message) return error.message
  if (error.error_description) return error.error_description
  if (error.msg) return error.msg

  // Fallback: try to stringify
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

/**
 * Logs error with full details for debugging
 */
export function logError(prefix: string, error: any): void {
  console.error(prefix, {
    message: formatError(error),
    ...(error?.code && { code: error.code }),
    ...(error?.status && { status: error.status }),
    ...(error?.details && { details: error.details }),
  })
}
