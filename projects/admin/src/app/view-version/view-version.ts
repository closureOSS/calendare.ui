import { Component, computed, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { version } from '../../../../../package.json';
import { CalendareFeatures, FeatureByClient } from '../../api';
import { CalendareResource } from '../../api/resources';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCheckOutline } from '@ng-icons/material-symbols/outline';
import { A9LabelValueListImports } from '../a9uitemplate/label-value-list';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
  selector: 'cal-view-version',
  imports: [
    JsonPipe,
    NgIcon,
    A9LabelValueListImports,
    HlmTableImports,
    HlmTooltipImports,
    HttpResourceViewer,
    TranslocoDirective,
  ],
   providers: [
    provideIcons({
      matCheckOutline,
    }),
  ],
  templateUrl: './view-version.html',
})
export class ViewVersion {
  private readonly calendareResource = inject(CalendareResource);

  public readonly appVersion = version;

  public readonly version = this.calendareResource.getVersion();

  public readonly calendarClients = computed(() => {
    if (this.version.hasValue()) {
      const env = this.version.value();
      return Object.keys(env?.featuresEnabled ?? []);
    }
    return [];
  });

  public buildClientFeature(featureSet: FeatureByClient, features: CalendareFeatures[]): { enabled: boolean; feature: CalendareFeatures }[] {
    if (!featureSet) {
      return [];
    }
    const response: { enabled: boolean; feature: CalendareFeatures }[] = [];
    for (const feature of features) {
      response.push({ enabled: featureSet.enabled?.includes(feature) ?? false, feature: feature });
    }
    return response;
  }
}
