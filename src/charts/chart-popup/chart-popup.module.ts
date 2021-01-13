import { NgModule } from '@angular/core';
import { ChartPortalModule } from '../chart-portal/chart-portal.module';
import { ChartPopupComponent } from './chart-popup.component';

@NgModule({
    imports: [ChartPortalModule],
    declarations: [ChartPopupComponent],
    exports: [ChartPopupComponent],
})
export class ChartPopupModule { }
