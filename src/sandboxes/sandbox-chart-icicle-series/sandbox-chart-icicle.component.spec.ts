import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SandboxChartIcicleSeriesComponent } from './sandbox-chart-icicle-series.component';

describe('SandboxChartIcicleSeriesComponent', () => {
  let component: SandboxChartIcicleSeriesComponent;
  let fixture: ComponentFixture<SandboxChartIcicleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartIcicleSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartIcicleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
