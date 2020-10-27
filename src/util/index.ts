export function cellClass(i: number, n: number, e: string) {
  const right = i % n === n - 1 ? 'right' : '';
  const left = i % n === 0 ? 'left' : '';
  const top = Math.floor(i / n) === 0 ? 'top' : '';
  const bottom = Math.floor(i / n) === n - 1 ? 'bottom' : '';
  return [right, left, top, bottom, 'cell', e].filter((e) => !!e).join(' ');
}

export function* chunk<T>(inp: T[], n: number) {
  for (let i = 0; i < inp.length; i += n) {
    yield inp.slice(i, i + n);
  }
}

export function* genWinState(len: number) {
  const rState = [
    ...chunk(
      Array.from({ length: len ** 2 }, (_, i) => i),
      len,
    ),
  ];
  yield Array.from({ length: len }, (_, i) => rState.map((row) => row[i]));
  yield [rState.map((row, i) => row[i])];
  yield [rState.map((row, i) => row[row.length - 1 - i])];
  yield rState;
}
