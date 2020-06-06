import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartBarVerticalSeriesComponent } from './example-chart-bar-vertical-series.component';

describe('SandboxChartBarVerticalSeriesComponent', () => {
  let component: ExampleChartBarVerticalSeriesComponent;
  let fixture: ComponentFixture<ExampleChartBarVerticalSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartBarVerticalSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartBarVerticalSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
