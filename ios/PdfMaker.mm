#import "PdfMaker.h"
#import "PDFWriterFactory.h"
#include <PDFModifiedPage.h>
#include <PDFPage.h>
#include <PDFUsedFont.h>
#include <PDFWriter.h>
#include <PageContentContext.h>
#include <libgen.h>
#import <stdexcept>

#if __has_include(<React/RCTEventDispatcher.h>)
#else
#import "RCTEventDispatcher.h"
#endif

@implementation PdfMaker

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(createPDF
                  : (NSDictionary *)documentActions createPDFResolve
                  : (RCTPromiseResolveBlock)resolve createPDFReject
                  : (RCTPromiseRejectBlock)reject) {
  try {
    NSString *path = PDFWriterFactory::create(documentActions);
    if (path == nil) {
      reject(@"error", @"Error generating PDF!", nil);
    } else {
      resolve(path);
    }
  } catch (const std::invalid_argument &e) {
    NSString *msg =
        [NSString stringWithCString:e.what()
                           encoding:[NSString defaultCStringEncoding]];
    reject(@"error", msg, nil);
  }
}

RCT_EXPORT_METHOD(modifyPDF
                  : (NSDictionary *)documentActions modifyPDFResolve
                  : (RCTPromiseResolveBlock)resolve modifyPDFReject
                  : (RCTPromiseRejectBlock)reject) {
  NSString *path = PDFWriterFactory::modify(documentActions);
  if (path == nil) {
    reject(@"error", @"Error modifying PDF!", nil);
  } else {
    resolve(path);
  }
}

RCT_EXPORT_METHOD(multiply
                  : (double)a b
                  : (double)b resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  NSNumber *result = @(pdfmaker::multiply(a, b));

  resolve(result);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativePdfMakerSpecJSI>(params);
}
#endif

@end
