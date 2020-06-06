import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartHalfDonutSeriesComponent } from './example-chart-half-donut-series.component';

describe('ExampleChartDonutSeriesComponent', () => {
  let component: ExampleChartHalfDonutSeriesComponent;
  let fixture: ComponentFixture<ExampleChartHalfDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartHalfDonutSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartHalfDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
