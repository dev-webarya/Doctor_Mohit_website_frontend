/// <reference types="vite/client" />

declare module "jspdf" {
  export class jsPDF {
    constructor(options?: Record<string, unknown>);
    setFontSize(size: number): this;
    text(text: string, x: number, y: number, options?: { align?: string }): this;
    setLineWidth(width: number): this;
    line(x1: number, y1: number, x2: number, y2: number): this;
    addPage(): this;
    splitTextToSize(text: string, maxWidth: number): string[];
    save(filename?: string): this;
  }
  export default jsPDF;
}
