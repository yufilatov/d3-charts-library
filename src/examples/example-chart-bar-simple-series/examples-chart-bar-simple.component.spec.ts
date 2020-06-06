import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartBarSimpleSeriesComponent } from './examples-chart-bar-simple-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: ExampleChartBarSimpleSeriesComponent;
  let fixture: ComponentFixture<ExampleChartBarSimpleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartBarSimpleSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartBarSimpleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
