import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  state = false;

  setSpinner(state: boolean) {
      if (this.state !== state) {
          this.state = state;
          this.changeDetectorRef.markForCheck();
      }
  }
}
