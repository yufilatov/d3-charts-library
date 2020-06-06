import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartMatrixSeriesComponent } from './example-chart-matrix-series.component';

describe('ExampleChartSunburstSeriesComponent', () => {
  let component: ExampleChartMatrixSeriesComponent;
  let fixture: ComponentFixture<ExampleChartMatrixSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartMatrixSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartMatrixSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
