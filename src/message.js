import { blue, green, grey } from 'chalk';

export default function message(name, text, extra = '', color = true) {
  if (color) {
    // Relog in color
    return message(blue(name), green(text), grey(extra), false);
  }

  // Standard Osia log format.
  return `[${name}] ${text} ${extra}`;
}
