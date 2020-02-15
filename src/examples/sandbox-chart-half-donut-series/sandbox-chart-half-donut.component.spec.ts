import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartHalfDonutSeriesComponent } from './sandbox-chart-half-donut-series.component';

describe('SandboxChartDonutSeriesComponent', () => {
  let component: SandboxChartHalfDonutSeriesComponent;
  let fixture: ComponentFixture<SandboxChartHalfDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartHalfDonutSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartHalfDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
