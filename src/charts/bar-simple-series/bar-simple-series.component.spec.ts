import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarSimpleSeriesChartComponent } from './bar-simple-series.component';

describe('BarHorizontalSeriesComponent', () => {
  let component: BarSimpleSeriesChartComponent;
  let fixture: ComponentFixture<BarSimpleSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarSimpleSeriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarSimpleSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
