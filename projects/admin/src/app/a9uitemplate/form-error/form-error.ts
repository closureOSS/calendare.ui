import { Component, input } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDangerousOutline } from '@ng-icons/material-symbols/outline';

@Component({
  selector: 'a9-form-error',
  imports: [
    HlmAlertImports,
    NgIcon,
  ],
  providers: [provideIcons({ matDangerousOutline, })],
  templateUrl: './form-error.html',
})
export class FormError {
  public errors = input.required<ValidationError.WithFieldTree | undefined>();
}
