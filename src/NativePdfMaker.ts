import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';
import type { DocumentAction } from './PDFDocument';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  createPDF(document: DocumentAction): Promise<string>;
  modifyPDF(document: DocumentAction): Promise<string>;
  getDocumentsDirectory(): Promise<string>;
  getAssetPath(assetName: string): Promise<string>;
  test(text: string): Promise<string>;
  measureText(
    text: string,
    fontName: string,
    fontSize: number
  ): Promise<{ width: number; height: number }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PdfMaker');
