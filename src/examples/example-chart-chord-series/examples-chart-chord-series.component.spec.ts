import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleChartChordSeriesComponent } from './examples-chart-chord-series.component';

describe('SandboxChartChordComponent', () => {
  let component: ExampleChartChordSeriesComponent;
  let fixture: ComponentFixture<ExampleChartChordSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChartChordSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartChordSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
