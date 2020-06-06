import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartDonutSeriesComponent } from './example-chart-donut-series.component';

describe('ExampleChartDonutSeriesComponent', () => {
  let component: ExampleChartDonutSeriesComponent;
  let fixture: ComponentFixture<ExampleChartDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartDonutSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
