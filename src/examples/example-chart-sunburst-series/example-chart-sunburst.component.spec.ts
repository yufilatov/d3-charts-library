import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartSunburstSeriesComponent } from './example-chart-sunburst-series.component';

describe('ExampleChartSunburstSeriesComponent', () => {
  let component: ExampleChartSunburstSeriesComponent;
  let fixture: ComponentFixture<ExampleChartSunburstSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartSunburstSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartSunburstSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
