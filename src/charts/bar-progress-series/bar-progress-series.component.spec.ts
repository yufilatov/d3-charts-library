import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarProgressSeriesChartComponent } from './bar-progress-series.component';

describe('BarSeriesComponent', () => {
  let component: BarProgressSeriesChartComponent;
  let fixture: ComponentFixture<BarProgressSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarProgressSeriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarProgressSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
