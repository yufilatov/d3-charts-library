import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartAreaSeriesComponent } from './sandbox-chart-area-series.component';

describe('SandboxChartAreaSeriesComponent', () => {
  let component: SandboxChartAreaSeriesComponent;
  let fixture: ComponentFixture<SandboxChartAreaSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartAreaSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartAreaSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
