import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartBarHorizontalSeriesComponent } from './example-chart-bar-horizontal-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: SandboxChartBarHorizontalSeriesComponent;
  let fixture: ComponentFixture<SandboxChartBarHorizontalSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SandboxChartBarHorizontalSeriesComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartBarHorizontalSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
