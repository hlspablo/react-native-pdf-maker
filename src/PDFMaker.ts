import { createDocument, createPage } from './createNative';

interface PDFCoords {
  x: number;
  y: number;
}
interface PDFSize {
  width: number;
  height: number;
}

type PDFOperator =
  | ((x: number) => void)
  | (() => void) // resetPosition
  | ((x: number, y: number) => void); // moveTo

interface Options extends PDFSize, PDFCoords { }

export interface DocumentInterface {
  addPage(page?: PageInterface | [number, number]): PageInterface;
  save(): void;
}

export interface PageInterface {
  setMediaBox(size: PDFSize): void;
  drawCircle(options: { coords: PDFCoords; radius: number }): void;
  drawRectangle(options: Options): void;
  drawLine(x1: number, y1: number, x2: number, y2: number): void;
  drawText(options: { coords: PDFCoords; text: string; font?: string }): void;
  drawImage(options: { coords: PDFCoords; imageUrl: string }): void;
  getPosition(): { x: number; y: number };
  getX(): number;
  getY(): number;
  moveDown(x: number): void;
  moveUp(x: number): void;
  moveLeft(x: number): void;
  moveRight(x: number): void;
  moveTo(x: number, y: number): void;
  resetPosition(): void;
  pushOperators(operators: PDFOperator[]): void;
}

export type NativeDocument = Pick<DocumentInterface, 'addPage' | 'save'>;

export type NativePage = Pick<
  PageInterface,
  | 'setMediaBox'
  | 'drawCircle'
  | 'drawRectangle'
  | 'drawLine'
  | 'drawText'
  | 'drawImage'
  | 'getPosition'
  | 'getX'
  | 'getY'
  | 'moveDown'
  | 'moveUp'
  | 'moveLeft'
  | 'moveRight'
  | 'moveTo'
  | 'resetPosition'
  | 'pushOperators'
>;

export class PDFMakerDocument implements DocumentInterface {
  private nativeDocumentInstance: NativeDocument;
  private functionCache: Partial<NativeDocument>;

  constructor() {
    // TODO add isJest() and Mock
    this.nativeDocumentInstance = createDocument();
    this.functionCache = {};
  }

  private getFunctionFromCache<T extends keyof NativeDocument>(
    functionName: T
  ): NativeDocument[T] {
    if (this.functionCache[functionName] == null) {
      this.functionCache[functionName] =
        this.nativeDocumentInstance[functionName];
    }
    return this.functionCache[functionName] as NativeDocument[T];
  }

  public save(): void {
    const func = this.getFunctionFromCache('save');
    return func();
  }

  public addPage(page?: PageInterface | [number, number]) {
    const func = this.getFunctionFromCache('addPage');
    return func(page);
  }
}

export class PDFMakerPage implements PageInterface {
  private nativePageInstance: NativePage;
  private functionCache: Partial<NativePage>;

  constructor() {
    // TODO add isJest() and Mock
    this.nativePageInstance = createPage();
    this.functionCache = {};
  }

  private getFunctionFromCache<T extends keyof NativePage>(
    functionName: T
  ): NativePage[T] {
    if (this.functionCache[functionName] == null) {
      this.functionCache[functionName] = this.nativePageInstance[functionName];
    }
    return this.functionCache[functionName] as NativePage[T];
  }

  public setMediaBox(size: PDFSize): void {
    const func = this.getFunctionFromCache('setMediaBox');
    func(size);
  }

  public drawCircle(options: { coords: PDFCoords; radius: number }): void {
    const func = this.getFunctionFromCache('drawCircle');
    func(options);
  }
  public drawRectangle(options: Options): void {
    const func = this.getFunctionFromCache('drawRectangle');
    func(options);
  }
  public drawLine(x1: number, y1: number, x2: number, y2: number): void {
    const func = this.getFunctionFromCache('drawLine');
    func(x1, y1, x2, y2);
  }
  public drawText(options: {
    coords: PDFCoords;
    text: string;
    font?: string;
  }): void {
    const func = this.getFunctionFromCache('drawText');
    func(options);
  }
  public drawImage(options: { coords: PDFCoords; imageUrl: string }): void {
    const funct = this.getFunctionFromCache('drawImage');
    funct(options);
  }
  public getPosition(): { x: number; y: number } {
    const func = this.getFunctionFromCache('getPosition');
    return func();
  }
  public getX(): number {
    const func = this.getFunctionFromCache('getX');
    return func();
  }
  public getY(): number {
    const func = this.getFunctionFromCache('getY');
    return func();
  }
  public moveDown(x: number): void {
    const func = this.getFunctionFromCache('moveDown');
    return func(x);
  }
  public moveUp(x: number): void {
    const func = this.getFunctionFromCache('moveUp');
    return func(x);
  }
  public moveLeft(x: number): void {
    const func = this.getFunctionFromCache('moveLeft');
    return func(x);
  }
  public moveRight(x: number): void {
    const func = this.getFunctionFromCache('moveRight');
    return func(x);
  }
  public moveTo(x: number, y: number): void {
    const func = this.getFunctionFromCache('moveTo');
    return func(x, y);
  }
  public resetPosition(): void {
    const func = this.getFunctionFromCache('resetPosition');
    return func();
  }
  public pushOperators(operators: PDFOperator[]): void {
    const func = this.getFunctionFromCache('pushOperators');
    return func(operators);
  }
}
