import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartBarSeriesComponent } from './sandbox-chart-bar-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: SandboxChartBarSeriesComponent;
  let fixture: ComponentFixture<SandboxChartBarSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartBarSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartBarSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
