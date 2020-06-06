import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SandboxChartBarSimpleSeriesComponent } from './sandbox-chart-bar-simple-series.component';

describe('SandboxChartBarSeriesComponent', () => {
  let component: SandboxChartBarSimpleSeriesComponent;
  let fixture: ComponentFixture<SandboxChartBarSimpleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartBarSimpleSeriesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartBarSimpleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
