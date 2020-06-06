import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartSunburstSeriesComponent } from './sandbox-chart-sunburst-series.component';

describe('SandboxChartSunburstSeriesComponent', () => {
  let component: SandboxChartSunburstSeriesComponent;
  let fixture: ComponentFixture<SandboxChartSunburstSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartSunburstSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartSunburstSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
