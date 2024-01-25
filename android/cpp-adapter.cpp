#include <jni.h>
#include "react-native-pdf-maker.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_pdfmaker_PdfMakerModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return pdfmaker::multiply(a, b);
}
