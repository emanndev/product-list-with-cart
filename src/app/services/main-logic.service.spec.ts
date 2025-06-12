import { TestBed } from '@angular/core/testing';

import { MainLogicService } from './main-logic.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Dessert } from '../../model/dessert.interface';

describe('MainLogicService', () => {
  let service: MainLogicService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [MainLogicService, { provide: HttpClient, useValue: spy }],
    });
    service = TestBed.inject(MainLogicService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get desserts successfully', () => {
    const mockDesserts: Dessert[] = [
      {
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
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockDesserts));

    service.getDesserts().subscribe((desserts) => {
      expect(desserts).toEqual(mockDesserts);
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('data.json');
  });

  it('should handle error on getDesserts', () => {
    const errorResponse = new Error('Failed to fetch');
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getDesserts().subscribe({
      error: (err) => {
        expect(err.message).toBe('Failed to load desserts');
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('data.json');
  });
});
