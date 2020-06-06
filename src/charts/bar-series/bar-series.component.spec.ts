import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarSeriesChartComponent } from './bar-series.component';

describe('BarHorizontalSeriesComponent', () => {
  let component: BarSeriesChartComponent;
  let fixture: ComponentFixture<BarSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarSeriesChartComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
