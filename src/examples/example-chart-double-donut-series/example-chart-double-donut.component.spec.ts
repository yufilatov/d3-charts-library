import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartDoubleDonutSeriesComponent } from './example-chart-double-donut-series.component';

describe('ExampleChartDoubleDonutSeriesComponent', () => {
  let component: ExampleChartDoubleDonutSeriesComponent;
  let fixture: ComponentFixture<ExampleChartDoubleDonutSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartDoubleDonutSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartDoubleDonutSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
