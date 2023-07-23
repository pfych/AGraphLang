import * as fs from 'fs';
import * as process from 'process';
import { Label, LETTER_HEIGHT, LETTER_WIDTH, Square } from './types';
import { labelInstruction } from './instructions/label';
import { squareInstruction } from './instructions/square';
import { leftOfInstruction } from './instructions/leftOf';
import { bellowInstruction } from './instructions/bellow';
import { furthestX, furthestY, pointers, processingStack } from './stack';

(async () => {
  const fileContent = fs.readFileSync(process.argv[2]).toString();
  const stack = fileContent
    .replaceAll('\n', ' ')
    .match(/(?:[^\s"]+|"[^"]*")+/g);

  for (let instruction of stack) {
    switch (instruction) {
      case 'Label':
      case '&':
        labelInstruction();
        break;
      case 'Square':
      case '[':
        squareInstruction();
        break;
      case 'LeftOf':
      case '<':
        leftOfInstruction(false);
        break;
      case 'LeftOfR':
      case '<-':
        leftOfInstruction(true);
        break;
      case 'Bellow':
      case 'v':
        bellowInstruction(false);
        break;
      case 'BellowR':
      case 'v-':
        bellowInstruction(true);
        break;
      default:
        if (instruction[0] === '@') {
          let referencedObject = processingStack.pop();
          if (typeof referencedObject !== 'string') {
            pointers[instruction.replace('@', '')] = {
              ...referencedObject,
              stackReference: instruction.replace('@', ''),
            };
          } else {
            throw new Error('Cannot push reference to raw string');
          }
          break;
        }

        if (instruction[0] === '$') {
          let referencedObject = processingStack.pop();
          if (typeof referencedObject !== 'string') {
            pointers[instruction.replace('$', '')] = {
              ...referencedObject,
              stackReference: instruction.replace('$', ''),
            };
          } else {
            throw new Error('Cannot push reference to raw string');
          }
          processingStack.push({
            ...referencedObject,
            stackReference: instruction.replace('$', ''),
          });
          break;
        }

        if (instruction[0] === '%') {
          processingStack.push(pointers[instruction.replace('%', '')]);
          break;
        }

        processingStack.push(instruction);
    }
  }

  const intFurX = processingStack.reduce((acc, item) => {
    if (typeof item === 'string') {
      return acc;
    }

    if (item.type === 'Square') {
      if (item.x + item.width > acc) {
        return item.x + item.width;
      }
    }

    if (item.type === 'Label') {
      if (item.x + item.value.length * LETTER_WIDTH > acc) {
        return item.x + item.value.length * LETTER_WIDTH;
      }
    }

    return acc;
  }, 0);

  const intFurY = processingStack.reduce((acc, item) => {
    if (typeof item === 'string') {
      return acc;
    }

    if (item.type === 'Square') {
      if (item.y + item.height > acc) {
        return item.y + item.height;
      }
    }

    if (item.type === 'Label') {
      if (item.y + LETTER_HEIGHT > acc) {
        console.log();
        return item.y + LETTER_HEIGHT;
      }
    }

    return acc;
  }, 0);

  const outputSVG = processingStack
    .map((item): string => {
      if (typeof item !== 'string' && item.type && !item.doNotRender) {
        switch (item.type) {
          case 'Square':
            return `<rect x="${item.x}" y="${item.y}" width="${item.width}" height="${item.height}" stroke="black" fill="#fff" stroke-width="1"/><text x="${item.label.x}" y="${item.label.y}" font-family="monospace" font-size="${LETTER_HEIGHT}">${item.label.value}</text>`;
          case 'Label':
            return `<text x="${item.x}" y="${item.y}" font-family="monospace" font-size="${LETTER_HEIGHT}">${item.value}</text>`;
          default:
            return '';
        }
      } else {
        return '';
      }
    })
    .join('');

  fs.writeFileSync(
    process.argv[2].replace('agl', 'svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" height="${intFurY}" width="${intFurX}">${outputSVG}</svg>`,
  );
})();
