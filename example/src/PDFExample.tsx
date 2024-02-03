import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { getDocumentsDirectory, getAssetPath } from 'react-native-pdf-maker';
import PDFPage from '../../src/PDFPage';
import PDFDocument from '../../src/PDFDocument';

export default function PDFExample() {
  const [pdfSource, setPdfSource] = React.useState('');
  // const source = {
  //   uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  //   cache: true,
  // };
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf' };
  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
  //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
  //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
  //

  const source = { uri: pdfSource, cache: true };

  async function createPDF() {
    const jpgPath = await getAssetPath('rato.jpg');
    console.log('jpgPath', jpgPath);
    const page1 = PDFPage.create()
      .setMediaBox(200, 200)
      .drawText('A caroline é feia!', {
        x: 5,
        y: 100,
        color: '#007386',
      })
      .drawImage(jpgPath, 'jpg', {
        x: 5,
        y: 180,
        width: 180,
        height: 100,
      });
    //
    // .drawRectangle({
    //   x: 25,
    //   y: 25,
    //   width: 150,
    //   height: 150,
    //   color: '#FF99CC',
    // })
    // .drawRectangle({
    //   x: 75,
    //   y: 75,
    //   width: 50,
    //   height: 50,
    //   color: '#99FFCC',
    // });

    const docsDir = await getDocumentsDirectory();
    const pdfPath = `${docsDir}/sample.pdf`;

    return PDFDocument.create(pdfPath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then((path: string) => {
        console.log('PDF created at: ' + path);
        return path;
      });
  }

  React.useEffect(() => {
    createPDF().then((path: string) => setPdfSource(path));
  }, []);

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 50,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
