import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartLineSeriesTypesComponent } from './sandbox-chart-line-series-types.component';

describe('SandboxChartLineSeriesTypeComponent', () => {
  let component: SandboxChartLineSeriesTypesComponent;
  let fixture: ComponentFixture<SandboxChartLineSeriesTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartLineSeriesTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartLineSeriesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
