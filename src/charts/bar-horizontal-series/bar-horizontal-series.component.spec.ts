import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarHorizontalSeriesChartComponent } from './bar-horizontal-series.component';

describe('BarHorizontalSeriesComponent', () => {
  let component: BarHorizontalSeriesChartComponent;
  let fixture: ComponentFixture<BarHorizontalSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarHorizontalSeriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarHorizontalSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
