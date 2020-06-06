import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunburstSeriesChartComponent } from './sunburst-series.component';

describe('SunburstSeriesComponent', () => {
  let component: SunburstSeriesChartComponent;
  let fixture: ComponentFixture<SunburstSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SunburstSeriesChartComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunburstSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
