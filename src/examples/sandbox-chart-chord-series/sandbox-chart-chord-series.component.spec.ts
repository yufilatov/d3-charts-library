import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxChartChordSeriesComponent } from './sandbox-chart-chord-series.component';

describe('SandboxChartChordComponent', () => {
  let component: SandboxChartChordSeriesComponent;
  let fixture: ComponentFixture<SandboxChartChordSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxChartChordSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxChartChordSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
