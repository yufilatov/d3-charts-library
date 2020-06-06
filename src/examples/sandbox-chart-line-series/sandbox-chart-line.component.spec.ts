import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SandboxChartLineSeriesComponent } from './sandbox-chart-line-series.component';

describe('SandboxChartPieSeriesComponent', () => {
  let component: SandboxChartLineSeriesComponent;
  let fixture: ComponentFixture<SandboxChartLineSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartLineSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartLineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
