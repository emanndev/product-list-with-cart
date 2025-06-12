import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../../model/dessert.interface';
import { CartServiceService } from '../../services/cart.service';
import { of } from 'rxjs';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartServiceService>;

  const mockDessert: Dessert = {
    id: 1,
    name: 'Test Dessert',
    category: 'Cake',
    price: 5.5,
    image: {
      thumbnail: 'thumbnail.jpg',
      mobile: 'mobile.jpg',
      tablet: 'tablet.jpg',
      desktop: 'desktop.jpg',
    },
  };

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartServiceService', [
      'add',
      'remove',
    ]);
    cartServiceSpy.cartItems$ = of([]);
    cartServiceSpy.totalQuantity$ = of(0);
    cartServiceSpy.totalPrice$ = of(0);

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, AddToCartComponent, CommonModule],
      providers: [{ provide: CartServiceService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockDessert;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive product input', () => {
    const testProduct: Dessert = {
      id: 2,
      name: 'Another Dessert',
      category: 'Pie',
      price: 6.0,
      image: {
        thumbnail: 'thumb.jpg',
        mobile: 'mob.jpg',
        tablet: 'tab.jpg',
        desktop: 'desk.jpg',
      },
    };
    component.product = testProduct;
    fixture.detectChanges();
    expect(component.product).toEqual(testProduct);
  });
});
