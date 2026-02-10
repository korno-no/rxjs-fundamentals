import { fromEvent, interval, merge, NEVER, timer, tap, scan, takeUntil,skipUntil } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

const counter$ = interval(1000).pipe(
    skipUntil(start$),
    scan((total) => total + 1, 0),
    tap(value => console.log('Counter value:', value)),
    takeUntil(pause$));
counter$.subscribe(setCount);