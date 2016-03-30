export default function message(name, text, extra = '', color = true) {
  if (color) {
    // Relog in color
    const esc = new Buffer([27]);
    return message(
      `${esc}[34m${name + esc}[0m`,
      `${esc}[32m${text + esc}[0m`,
      `${esc}[1;30m${extra + esc}[0m`,
      false
    );
  }

  // Standard Osia log format.
  return `[${name}] ${text} ${extra}`;
}
