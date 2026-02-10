import { fromEvent, interval, merge, NEVER, timer, map, tap, scan,switchMap, takeUntil,skipUntil , shareReplay} from 'rxjs';
import { startWith } from 'rxjs/operators'

import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(map(()=> true));
const pause$ = fromEvent(pauseButton, 'click').pipe(map(()=> false));

const counter$ = merge(start$, pause$).pipe(
    switchMap((isRunning) => (isRunning ? interval(1000) : NEVER)),
    scan((total) => total + 1, 0),
)
counter$.subscribe(setCount);