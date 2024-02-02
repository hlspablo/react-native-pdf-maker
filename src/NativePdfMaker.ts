import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';
import type { Document } from './PdfMakerInterface';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  createPDF(document: Document): Promise<string>;
  modifyPDF(document: Document): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PdfMaker');
