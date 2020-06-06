import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleChartRadialTreeComponent } from './example-chart-radial-tree-series..component';

describe('ExampleChartRadialTreeComponent', () => {
  let component: ExampleChartRadialTreeComponent;
  let fixture: ComponentFixture<ExampleChartRadialTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleChartRadialTreeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChartRadialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
