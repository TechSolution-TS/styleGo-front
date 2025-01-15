import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarberListingComponent } from './barber-listing.component';

describe('BarberListingComponent', () => {
  let component: BarberListingComponent;
  let fixture: ComponentFixture<BarberListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
