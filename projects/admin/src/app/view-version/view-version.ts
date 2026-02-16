import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { version } from '../../../../../package.json';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendareFeatures, FeatureByClient } from '../../api';
import { CalendareResource } from '../../api/resources';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-version',
  imports: [
    JsonPipe,
    MatIconModule,
    MatTooltipModule,
    HttpResourceViewer,
    TranslocoDirective,
  ],
  templateUrl: './view-version.html',
  styleUrl: './view-version.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
