import { NativeModules, Platform } from 'react-native';
import type { Document } from './PdfMakerInterface';

const LINKING_ERROR =
  `The package 'react-native-pdf-maker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PdfMakerModule = isTurboModuleEnabled
  ? require('./NativePdfMaker').default
  : NativeModules.PdfMaker;

const PdfMaker = PdfMakerModule
  ? PdfMakerModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return PdfMaker.multiply(a, b);
}
export function createPDF(document: Document): Promise<string> {
  return PdfMaker.createPDF(document);
}
export function modifyPDF(document: Document): Promise<string> {
  return PdfMaker.modifyPDF(document);
}
