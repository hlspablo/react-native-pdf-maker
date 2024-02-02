import { NativeModules, Platform } from 'react-native';
import type { DocumentAction } from './PDFDocument';

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

export function multiply(a: number, b: number) {
  return PdfMaker.multiply(a, b);
}
export function createPDF(document: DocumentAction) {
  return PdfMaker.createPDF(document);
}
export function modifyPDF(document: DocumentAction) {
  return PdfMaker.modifyPDF(document);
}
export function getDocumentsDirectory() {
  return PdfMaker.getDocumentsDirectory();
}
export function getAssetPath(assetName: string) {
  return PdfMaker.getAssetPath(assetName);
}
export function measureText(text: string, fontName: string, fontSize: number) {
  return PdfMaker.measureText(text, fontName, fontSize);
}
export function test(text: string) {
  return PdfMaker.test(text);
}
