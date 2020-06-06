import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartDoubleDonutSeriesComponent } from './sandbox-chart-double-donut-series.component';

describe('SandboxChartDoubleDonutSeriesComponent', () => {
  let component: SandboxChartDoubleDonutSeriesComponent;
  let fixture: ComponentFixture<SandboxChartDoubleDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartDoubleDonutSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartDoubleDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
