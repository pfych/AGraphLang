import { processingStack } from '../stack';

export const labelInstruction = () => {
  let text = processingStack.pop();

  if (typeof text !== 'string') {
    throw new Error(
      `Expected string on stack when creating label... Got ${JSON.stringify(
        text,
      )}`,
    );
  }

  processingStack.push({
    type: 'Label',
    value: text.replaceAll('"', ''),
    x: 0,
    y: 0,
  });
};
