import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartBarProgressSeriesComponent } from './sandbox-chart-bar-progress-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: SandboxChartBarProgressSeriesComponent;
  let fixture: ComponentFixture<SandboxChartBarProgressSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartBarProgressSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartBarProgressSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
