import m from './message';

export default function timer(item) {
  console.log(m(`${item.meta.name}`, 'Starting', '', item.meta.color));
  const time = process.hrtime();
  return () => {
    const [, nano] = process.hrtime(time);
    console.log(m(`${item.meta.name}`, 'Finished', `(in ${nano / 1000000}ms)`, item.meta.color));
  };
}
