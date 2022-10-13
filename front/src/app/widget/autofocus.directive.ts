import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input()
  selectAll: string = 'noselect';

  constructor(private elt: ElementRef<HTMLElement>) {
    console.log('instantiate directive autofocus');
  }

  ngOnInit(): void {
    console.log('this.selectAll: ', this.selectAll);
    if (
      this.selectAll !== 'noselect' &&
      this.elt.nativeElement instanceof HTMLInputElement
    ) {
      this.elt.nativeElement.select();
      return;
    }

    this.elt.nativeElement.focus();
  }
}
