import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, observable, Observable, of, fromEvent, interval} from 'rxjs';
import {map, mergeMap, concatMap, delay, switchMap, exhaustMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-maps',
  templateUrl: './rxjs-maps.component.html',
  styleUrls: ['./rxjs-maps.component.css']
})
export class RxjsMapsComponent implements OnInit, AfterViewInit {
  @ViewChild('switchMapBtn') switchMapBtn: ElementRef;
  @ViewChild('exaustMapBtn') exaustMapBtn: ElementRef;

  private delayedObservables$: Observable<string>[] = [];
  queuedConcatObservables: string[] = [];

  form: FormGroup;
  mergeMap$: Observable<string>;
  concatMapOutput: string[] = [];
  switchmap$: Observable<number>;
  exaustMap$: Observable<number>;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchField1: [null],
      searchField2: [null]
    });

    this.mergeMap$ = this.form.get('searchField1').valueChanges.pipe(
      mergeMap(s1 => this.form.get('searchField2').valueChanges.pipe(
        map(s2 => s1 + ' ' + s2)
      ))
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setSwitchMapObservable();
      this.setExaustMapObservable();
    }, 1);
  }

  setSwitchMapObservable(): void{
    const obs1$ = fromEvent(this.switchMapBtn.nativeElement,'click');
    const obs2$ = interval(1000);
    this.switchmap$ = obs1$.pipe(switchMap(event => obs2$));
  }

  setExaustMapObservable(): void{
    const obs1$ = fromEvent(this.exaustMapBtn.nativeElement,'click');
    this.exaustMap$ = obs1$.pipe(
      exhaustMap(event => interval(1000).pipe(take(5)))
    );
  }

  submittedDelayTime(time: number): void{
    if (!time) {
      return;
    }
    this.concatMapOutput = [];
    const obs = `${time}ms delayed`;
    this.delayedObservables$.push(of (obs).pipe(delay(time)));
    this.queuedConcatObservables.push(obs);
  }

  startConcatMap(): void{
    from(this.delayedObservables$)
      .pipe(
        concatMap(x => x)
      ).subscribe(x => {
      this.concatMapOutput.push(x);
      this.queuedConcatObservables.splice(0,1);
    });

    this.delayedObservables$ = [];
  }

  stopSwitchMap(): void{
    this.switchmap$ = null;
    this.setSwitchMapObservable();
  }
}
