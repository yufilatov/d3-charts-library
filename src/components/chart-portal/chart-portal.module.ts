import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPortalService } from './chart-portal.service';
import { ChartPortalComponent } from './chart-portal.component';

@NgModule({
    declarations: [
        ChartPortalComponent,
    ],
    providers: [
        ChartPortalService,
    ],
    imports: [
        CommonModule,
    ]
})
export class ChartPortalModule {
}
