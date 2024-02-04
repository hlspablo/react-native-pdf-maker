import { NativeModules, Platform } from 'react-native';
import type { NativeDocument, NativePage } from 'react-native-pdf-maker';

// global func declaration for JSI functions
declare global {
  function createPdfMakerDocumentInstance(): NativeDocument;
  function createPdfMakerPageInstance(): NativePage;
  function nativeCallSyncHook(): unknown;
}

export const createPage = (): NativePage => {
  if (global.createPdfMakerPageInstance == null) {
    installJSIBindings();
  }
  return global.createPdfMakerPageInstance();
};

export const createDocument = (): NativeDocument => {
  if (global.createPdfMakerDocumentInstance == null) {
    installJSIBindings();
  }
  return global.createPdfMakerDocumentInstance();
};

const installJSIBindings = () => {
  // Get the native Document ReactModule
  const PDFMakerModule = NativeModules.PDFMaker;
  if (PDFMakerModule == null) {
    let message =
      'Failed to create PDFMaker instances: The native PDFMaker Module could not be found.';
    message +=
      '\n* Make sure react-native-pdf-maker is correctly autolinked (run `npx react-native config` to verify)';
    if (Platform.OS === 'ios' || Platform.OS === 'macos') {
      message += '\n* Make sure you ran `pod install` in the ios/ directory.';
    }
    if (Platform.OS === 'android') {
      message += '\n* Make sure gradle is synced.';
    }
    // check if Expo
    const ExpoConstants =
      NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants;
    if (ExpoConstants != null) {
      if (ExpoConstants.appOwnership === 'expo') {
        // We're running Expo Go
        throw new Error(
          'react-native-pdf-maker is not supported in Expo Go! Use EAS (`expo prebuild`) or eject to a bare workflow instead.'
        );
      } else {
        // We're running Expo bare / standalone
        message += '\n* Make sure you ran `expo prebuild`.';
      }
    }

    message += '\n* Make sure you rebuilt the app.';
    throw new Error(message);
  }

  // Check if we are running on-device (JSI)
  if (global.nativeCallSyncHook == null || PDFMakerModule.install == null) {
    throw new Error(
      'Failed to create a new Document instance: React Native is not running on-device. PDFMaker can only be used when synchronous method invocations (JSI) are possible. If you are using a remote debugger (e.g. Chrome), switch to an on-device debugger (e.g. Flipper) instead.'
    );
  }

  // Call the synchronous blocking install() function
  const result = PDFMakerModule.install();
  if (result !== true)
    throw new Error(
      `The native PDFMaker Module could not be installed! Looks like something went wrong when installing JSI bindings: ${result}`
    );

  // Check again if the constructor now exists. If not, throw an error.
  if (
    global.createPdfMakerDocumentInstance == null ||
    global.createPdfMakerPageInstance == null
  )
    throw new Error(
      'Failed to create PDFMaker instances, the native initializer function does not exist. Are you trying to use PDFMaker from different JS Runtimes?'
    );
};
