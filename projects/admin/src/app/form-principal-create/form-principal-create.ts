import { booleanAttribute, ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, model, output, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormPrincipalCreateData } from './form-principal-create.data';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';

@Component({
  selector: 'cal-form-principal-create',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    HintBox,
    ActionBar,
    TranslocoDirective,
],
  templateUrl: './form-principal-create.html',
  styleUrl: './form-principal-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPrincipalCreate {
  public readonly readonlyEmail = input(false, { transform: booleanAttribute });
  public readonly defaultData = input<Partial<FormPrincipalCreateData> | null>();
  public msg = model<string | null>(null);
  public data = output<FormPrincipalCreateData>();

  public form: FormGroup;


  constructor() {
    const formBuilder = inject(FormBuilder);
    this.form = this.createForm(formBuilder)
    effect(() => {
      if (this.defaultData()) {
        this.form = this.createForm(formBuilder);
      }
    })
  }

  private createForm(formBuilder: FormBuilder) {
    const form = formBuilder.group<FormPrincipalCreateData>({
      username: this.defaultData()?.username ?? null,
      email: this.defaultData()?.email ?? null,
      displayName: this.defaultData()?.displayName ?? null,
      description: this.defaultData()?.description ?? null,
      timezone: this.defaultData()?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      color: this.defaultData()?.color ?? null,
    });
    form.get('username')?.addValidators([Validators.required, Validators.minLength(5), Validators.maxLength(48),
    Validators.pattern('[a-z][0-9|a-z|.|-]*')
    ]);
    form.get('email')?.addValidators([Validators.required]);
    form.get('timezone')?.addValidators([Validators.required]);
    return form;
  }


  public submitForm() {
    if (!this.form || !this.form.valid) {
      this.msg.set('Data is invalid, please correct input first');
      return;
    }
    console.log(this.form.value as FormPrincipalCreateData);
    this.data.emit(this.form.value as FormPrincipalCreateData);
  }

  public filteredOptions: string[] = [];
  public timezoneInput = viewChild.required<ElementRef>('timezoneinput');
  filterTimezones(): void {
    const filterValue = this.timezoneInput()?.nativeElement?.value?.toLowerCase();
    this.filteredOptions = filterValue ? Intl.supportedValuesOf('timeZone').filter(o => o?.toLowerCase().includes(filterValue)) : Intl.supportedValuesOf('timeZone');
  }
}
