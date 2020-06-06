import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartLineSeriesTypesComponent } from './example-chart-line-series-types.component';

describe('SandboxChartLineSeriesTypeComponent', () => {
  let component: ExampleChartLineSeriesTypesComponent;
  let fixture: ComponentFixture<ExampleChartLineSeriesTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartLineSeriesTypesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartLineSeriesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
