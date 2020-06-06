import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ExampleChartLineSeriesComponent } from './sandbox-chart-line-series.component';

describe('ExampleChartPieSeriesComponent', () => {
  let component: ExampleChartLineSeriesComponent;
  let fixture: ComponentFixture<ExampleChartLineSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartLineSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartLineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
