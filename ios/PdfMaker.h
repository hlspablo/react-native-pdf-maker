#ifdef __cplusplus
#import "react-native-pdf-maker.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPdfMakerSpec.h"

@interface PdfMaker : NSObject <NativePdfMakerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PdfMaker : NSObject <RCTBridgeModule>
#endif

@end
