import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartPieSeriesComponent } from './example-chart-pie-series.component';

describe('ExampleChartPieSeriesComponent', () => {
  let component: ExampleChartPieSeriesComponent;
  let fixture: ComponentFixture<ExampleChartPieSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartPieSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartPieSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
