import { GAP, HORIZONTAL_PADDING } from '../types';
import { pointers, processingStack } from '../stack';

export const leftOfInstruction = (drop: boolean) => {
  let leftOfSquareTwo = processingStack.pop();
  let leftOfSquareOne = processingStack.pop();

  if (!leftOfSquareOne || !leftOfSquareTwo) {
    throw new Error('Overflow error');
  }

  if (
    typeof leftOfSquareTwo !== 'string' &&
    typeof leftOfSquareOne !== 'string' &&
    'label' in leftOfSquareOne &&
    'label' in leftOfSquareTwo
  ) {
    if (!drop) {
      processingStack.push(leftOfSquareOne);
    }

    let newLeftOfSquareTwoX = leftOfSquareOne.x + leftOfSquareOne.width + GAP;
    let newLeftOfSquareTwo = {
      ...leftOfSquareTwo,
      label: {
        ...leftOfSquareTwo.label,
        x: leftOfSquareOne.x + leftOfSquareOne.width + GAP + HORIZONTAL_PADDING,
      },
      x: newLeftOfSquareTwoX,
    };

    processingStack.push(newLeftOfSquareTwo);

    if (newLeftOfSquareTwo.stackReference) {
      pointers[newLeftOfSquareTwo.stackReference] = newLeftOfSquareTwo;
    }
  } else {
    throw new Error(
      `Expected two squares on stack... Got ${JSON.stringify([
        leftOfSquareTwo,
        leftOfSquareOne,
      ])}`,
    );
  }
};
