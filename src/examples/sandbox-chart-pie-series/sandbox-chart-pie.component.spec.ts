import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SandboxChartPieSeriesComponent } from './sandbox-chart-pie-series.component';

describe('SandboxChartPieSeriesComponent', () => {
  let component: SandboxChartPieSeriesComponent;
  let fixture: ComponentFixture<SandboxChartPieSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartPieSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartPieSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
