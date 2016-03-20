import routine from 'promise-routine';

export default function plugin(callback) {
  return files => routine(file => new Promise((resolve, reject) => {
    const test = callback(file, resolve, reject);
    if (typeof test !== 'undefined') resolve(test);
  }), ...files);
}
