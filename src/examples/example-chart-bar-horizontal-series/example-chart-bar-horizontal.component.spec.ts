import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartBarHorizontalSeriesComponent } from './example-chart-bar-horizontal-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: ExampleChartBarHorizontalSeriesComponent;
  let fixture: ComponentFixture<ExampleChartBarHorizontalSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartBarHorizontalSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartBarHorizontalSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
