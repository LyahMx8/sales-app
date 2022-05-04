import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { fromEvent, map, pairwise, throttleTime } from 'rxjs';
import { distinctUntilChanged, filter, share } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';


enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}
enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-header',
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit  {
  public sticky:boolean = true

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.sticky ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor() {}

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10), //Observable that emmits first item
      map(() => window.pageYOffset),
      pairwise(), //Group values emmited by scroll stream
      map(([y1, y2]): Direction => ((y2 < y1) ? Direction.Up : Direction.Down)), //Compare values direction
      distinctUntilChanged(), // Secquence contains only distinct elements
      share() // Sequence shares a single subscription | avoid create multiple subscriptions
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp$.subscribe(() => (this.sticky = true));
    scrollDown$.subscribe(() => (this.sticky = false));
  }

}
