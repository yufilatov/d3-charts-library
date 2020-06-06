import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ExampleChartIcicleSeriesComponent } from './example-chart-icicle-series.component';

describe('ExampleChartIcicleSeriesComponent', () => {
  let component: ExampleChartIcicleSeriesComponent;
  let fixture: ComponentFixture<ExampleChartIcicleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartIcicleSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartIcicleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
