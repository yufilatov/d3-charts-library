import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartDonutSeriesComponent } from './sandbox-chart-donut-series.component';

describe('SandboxChartDonutSeriesComponent', () => {
  let component: SandboxChartDonutSeriesComponent;
  let fixture: ComponentFixture<SandboxChartDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartDonutSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
