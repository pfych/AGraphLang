export const LETTER_HEIGHT = 12;
export const LETTER_WIDTH = 7.2;
export const VERTICAL_PADDING = 6;
export const HORIZONTAL_PADDING = 12;
export const GAP = 8;

export interface Shape {
  stackReference?: string;
  x: number;
  y: number;
}

export interface Label extends Shape {
  type: 'Label';
  value: string;
}

export interface Square extends Shape {
  type: 'Square';
  label: Label;
  width: number;
  height: number;
}
