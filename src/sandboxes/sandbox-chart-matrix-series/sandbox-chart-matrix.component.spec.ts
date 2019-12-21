import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartMatrixSeriesComponent } from './sandbox-chart-matrix-series.component';

describe('SandboxChartSunburstSeriesComponent', () => {
  let component: SandboxChartMatrixSeriesComponent;
  let fixture: ComponentFixture<SandboxChartMatrixSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartMatrixSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartMatrixSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
