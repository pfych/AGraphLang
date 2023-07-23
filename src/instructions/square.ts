import {
  HORIZONTAL_PADDING,
  LETTER_HEIGHT,
  LETTER_WIDTH,
  VERTICAL_PADDING,
} from '../types';
import { pointers, processingStack } from '../stack';

export const squareInstruction = () => {
  let label = processingStack.pop();

  if (typeof label !== 'string' && 'value' in label) {
    let squareWidth =
      label.value.split('').length * LETTER_WIDTH + HORIZONTAL_PADDING * 2;
    let squareHeight = LETTER_HEIGHT + VERTICAL_PADDING * 2;

    processingStack.push({
      type: 'Square',
      label: {
        ...label,
        x: HORIZONTAL_PADDING,
        y: LETTER_HEIGHT + VERTICAL_PADDING - 2,
      },
      x: 0,
      y: 0,
      width: squareWidth,
      height: squareHeight,
    });

    if (label.stackReference) {
      delete pointers[label.stackReference];
    }
  } else {
    throw new Error(
      `Attempted square create when Label was not next on the stack, got ${JSON.stringify(
        label,
      )}`,
    );
  }
};
