import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChordSeriesChartComponent } from './chord-series.component';

describe('BarComponent', () => {
  let component: ChordSeriesChartComponent;
  let fixture: ComponentFixture<ChordSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChordSeriesChartComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
