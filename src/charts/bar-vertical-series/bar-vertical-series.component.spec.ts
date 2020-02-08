import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarVerticalSeriesChartComponent } from './bar-vertical-series.component';

describe('BarHorizontalSeriesComponent', () => {
  let component: BarVerticalSeriesChartComponent;
  let fixture: ComponentFixture<BarVerticalSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarVerticalSeriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarVerticalSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
