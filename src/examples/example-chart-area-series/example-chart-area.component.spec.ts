import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartAreaSeriesComponent } from './example-chart-area-series.component';

describe('SandboxChartAreaSeriesComponent', () => {
  let component: ExampleChartAreaSeriesComponent;
  let fixture: ComponentFixture<ExampleChartAreaSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartAreaSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartAreaSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
