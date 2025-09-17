declare module 'pdf-parse' {
  import type {Buffer} from 'node:buffer';

  interface PDFInfo {
    numPages: number;
    info?: Record<string, unknown>;
    metadata?: unknown;
    text: string;
    version?: string;
  }

  type PDFParse = (data: Buffer | Uint8Array | ArrayBuffer, options?: Record<string, unknown>) => Promise<PDFInfo>;

  const pdfParse: PDFParse;
  export = pdfParse;
}

