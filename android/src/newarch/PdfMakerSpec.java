package com.pdfmaker;

import com.facebook.react.bridge.ReactApplicationContext;

abstract class PdfMakerSpec extends NativePdfMakerSpec {
  PdfMakerSpec(ReactApplicationContext context) {
    super(context);
  }
}
