import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartBarProgressSeriesComponent } from './examples-chart-bar-progress-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: ExampleChartBarProgressSeriesComponent;
  let fixture: ComponentFixture<ExampleChartBarProgressSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartBarProgressSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartBarProgressSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
