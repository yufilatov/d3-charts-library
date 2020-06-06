import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrixSeriesChartComponent } from './matrix-series.component';

describe('MatrixComponent', () => {
  let component: MatrixSeriesChartComponent;
  let fixture: ComponentFixture<MatrixSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixSeriesChartComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
