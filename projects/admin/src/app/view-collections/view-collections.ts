import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { hasPermission } from '../core/has-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { ListPermissions } from '../widgets/list-permissions/list-permissions';
import { CollectionResponse, CollectionType, PrincipalType, PrivilegeMask } from '../../api/models';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { ColorSwatch } from "../widgets/color-swatch/color-swatch";
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-collections',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    ListPermissions,
    HintBox,
    HttpResourceViewer,
    TranslocoDirective,
    ColorSwatch
  ],
  templateUrl: './view-collections.html',
  styleUrl: './view-collections.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCollections {
  public username = input.required<string>();
  public principalType = input<PrincipalType | null>();
  public filterType = input<CollectionType | null>(null);
  public filterTechnical = input<boolean>(true);
  readonly dialog = inject(MatDialog);
  private readonly confirmDialog = inject(ConfirmDialogProvider);
  readonly PrivilegeMask = PrivilegeMaskConstant;
  private readonly transloco = inject(TranslocoService);

  readonly userFilterMask = PrivilegeMaskConstant.Bind |
    PrivilegeMaskConstant.ScheduleDeliverReply | PrivilegeMaskConstant.ScheduleQueryFreebusy |
    PrivilegeMaskConstant.ScheduleSendReply | PrivilegeMaskConstant.ScheduleSendFreebusy;
  readonly collectionFilterMask = this.userFilterMask | PrivilegeMaskConstant.Unbind;

  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  public readonly collections = this.calendareResource.getCollectionByOwner(this.username);

  public refresh() {
    this.collections.reload();
  }

  async deleteCollection(collection: CollectionResponse) {
    if (!collection || !collection.uri) {
      return;
    }
    const answer = await this.confirmDialog.ask({
      title: this.transloco.translate(`Delete *collectionType`, { collectionType: collection.displayName }),
      intro: this.transloco.translate('Deleting collection is irreversible'),
      question: this.transloco.translate('Are you sure?')
    });
    if (answer !== true) {
      return;
    }
    try {
      await firstValueFrom(this.client.deleteCollectionByUri(collection.uri));
      this.refresh();
    }
    catch (e) {
      // TODO: Error handling ...
      console.error('Error deleting collection %o: %o', collection, e);
    }
  }

  public hasPermission(permissions: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean {
    return hasPermission(permissions, required);
  }

  public svgCardIcon(collectionType: CollectionType | undefined): string {
    switch (collectionType) {
      case CollectionType.Calendar: return 'calendar_today#avatar';
      case CollectionType.Addressbook: return 'contacts#avatar';
      case CollectionType.Collection: return 'library_books#avatar';
    }
    return '';
  }

  protected filteredCollections(): CollectionResponse[] | undefined {
    if (!this.collections.hasValue()) return undefined;
    if (this.filterType()) {
      return this.collections.value().filter(c => c.collectionType === this.filterType() && (this.filterTechnical() ? !c.isTechnical : true));
    }
    return this.collections.value();
  }
}
