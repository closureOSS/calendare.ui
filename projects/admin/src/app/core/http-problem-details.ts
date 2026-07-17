
export interface HttpProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  // Handle the RFC 9457 extension members:
  traceId?: string | null;
  url?: string | null;
  [key: string]: any; // Allows any other dynamic server extensions
}
