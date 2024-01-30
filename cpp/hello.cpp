#include "PDFWriter.h"
#include "PDFPage.h"
#include "PageContentContext.h"
#include "PDFUsedFont.h"
#include "../PDFWriterTesting/testing/TestIO.h"
#include <iostream>

using namespace PDFHummus;
using namespace std;

int main(int argc, char* argv[])
{
    EStatusCode status = eSuccess;
    PDFWriter pdfWriter;
    const char* passedArg = argv[1];

    do
    {
        status = pdfWriter.StartPDF(BuildRelativeOutputPath(argv,"TextMeasurementsTest.pdf"),
                                    ePDFVersion13,
                                    LogConfiguration(true,true,
                                                     BuildRelativeOutputPath(argv,"TextMeasurementsTest.log")));
        if(status != eSuccess)
        {
            cout<<"Failed to start file\n";
            break;
        }

        PDFPage* page = new PDFPage();
        page->SetMediaBox(PDFRectangle(0,0,595,842));

        PageContentContext* cxt = pdfWriter.StartPageContentContext(page);
        PDFUsedFont* arialFont = pdfWriter.GetFontForFile(
                BuildRelativeInputPath(
                        argv,
                        "fonts/arial.ttf"));
        if(!arialFont)
        {
            status = PDFHummus::eFailure;
            cout<<"Failed to create font for arial font\n";
            break;
        }

        AbstractContentContext::GraphicOptions pathStrokeOptions(AbstractContentContext::eStroke,
                                                                 AbstractContentContext::eRGB,
                                                                 AbstractContentContext::ColorValueForName("DarkMagenta"),
                                                                 4);
        AbstractContentContext::TextOptions textOptions(arialFont,
                                                        14,
                                                        AbstractContentContext::eGray,
                                                        0);



        string textToGo = "ASDKASKDAKSDKASKDASKDKASDKASKDASKDKA dwadwadwadwadwadwadwadawd - MANGA ROSA 10";
        PDFUsedFont::TextMeasures textDimensions = arialFont->CalculateTextDimensions(textToGo,22);

        cxt->WriteText(10,100,textToGo,textOptions);
        DoubleAndDoublePairList pathPoints;
        pathPoints.push_back(DoubleAndDoublePair(10+textDimensions.xMin,98+textDimensions.yMin));
        pathPoints.push_back(DoubleAndDoublePair(10+textDimensions.xMax,98+textDimensions.yMin));
        cxt->DrawPath(pathPoints,pathStrokeOptions);
        pathPoints.clear();
        pathPoints.push_back(DoubleAndDoublePair(10+textDimensions.xMin,102+textDimensions.yMax));
        pathPoints.push_back(DoubleAndDoublePair(10+textDimensions.xMax,102+textDimensions.yMax));
        cxt->DrawPath(pathPoints,pathStrokeOptions);

        status = pdfWriter.EndPageContentContext(cxt);
        if(status != eSuccess)
        {
            status = PDFHummus::eFailure;
            cout<<"Failed to end content context\n";
            break;
        }

        status = pdfWriter.WritePageAndRelease(page);
        if(status != eSuccess)
        {
            status = PDFHummus::eFailure;
            cout<<"Failed to write page\n";
            break;
        }


        status = pdfWriter.EndPDF();
        if(status != eSuccess)
        {
            status = PDFHummus::eFailure;
            cout<<"Failed to end pdf\n";
            break;
        }

    }while(false);


    return status == eSuccess ? 0:1;
}
