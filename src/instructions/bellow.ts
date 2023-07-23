import { GAP, LETTER_HEIGHT, VERTICAL_PADDING } from '../types';
import { pointers, processingStack } from '../stack';

export const bellowInstruction = (drop: boolean) => {
  let bellowSquareTwo = processingStack.pop();
  let bellowSquareOne = processingStack.pop();

  if (
    typeof bellowSquareTwo !== 'string' &&
    typeof bellowSquareOne !== 'string' &&
    'label' in bellowSquareOne &&
    'label' in bellowSquareTwo
  ) {
    if (!drop) {
      processingStack.push(bellowSquareOne);
    }

    let newBellowSquareTwoY = bellowSquareOne.y + bellowSquareOne.height + GAP;
    let newBellowSquareTwo = {
      ...bellowSquareTwo,
      label: {
        ...bellowSquareTwo.label,
        y: newBellowSquareTwoY + LETTER_HEIGHT + VERTICAL_PADDING - 2,
      },
      y: newBellowSquareTwoY,
    };

    processingStack.push(newBellowSquareTwo);

    if (newBellowSquareTwo.stackReference) {
      pointers[newBellowSquareTwo.stackReference] = newBellowSquareTwo;
    }
  } else {
    throw new Error(
      `Expected two squares on stack... Got ${JSON.stringify([
        bellowSquareTwo,
        bellowSquareOne,
      ])}`,
    );
  }
};
