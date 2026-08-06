import { Component } from "@angular/core";

@Component({
  selector: 'a9-label',
  template: `<ng-content>label</ng-content>`,
})
export class LabelValueItemLabel {}

@Component({
  selector: 'a9-value',
  template: `<ng-content>value</ng-content>`,
})
export class LabelValueItemValue {}
