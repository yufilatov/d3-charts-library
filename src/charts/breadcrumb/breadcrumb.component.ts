import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { IChartLabelStyle, ChartStyle } from '../chart-style/chart-style';
@Component({
    selector: 'app-chart-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbChartComponent {
    @HostBinding('class.chart-breadcrumb') hostClass = true;

    private _selection: any;

    @Output() selectionChange = new EventEmitter<any>();

    @Input() path: any[] = [];
    @Input() style = new ChartStyleBuilder();
    @Input() format = (x: any) => '' + x;
    @Input() set selection(value: any) {
        if (value !== this._selection) {
            this._selection = value;
            this.selectionChange.emit(value);
        }
    }

    get selection() {
        return this._selection;
    }

    getColor(index: number) {
        const labelStyle = this.style.compile<IChartLabelStyle>(ChartStyle.label);
        const color = labelStyle(null, index).color;

        return color;
    }

}
