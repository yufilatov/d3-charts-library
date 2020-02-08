import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartBarVerticalSeriesComponent } from './sandbox-chart-bar-series.component';

describe('SandboxChartBarVerticalSeriesComponent', () => {
  let component: SandboxChartBarVerticalSeriesComponent;
  let fixture: ComponentFixture<SandboxChartBarVerticalSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartBarVerticalSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartBarVerticalSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
