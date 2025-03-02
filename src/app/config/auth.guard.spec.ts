import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from '../config/auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  const mockLocalStorage = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string): string | null => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    });

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow navigation if token exists', () => {
    localStorage.setItem('token', 'fake-token');
    expect(authGuard.canActivate()).toBeTrue(); 
  });

  it('should redirect to login if token does not exist', () => {
    localStorage.removeItem('token'); 
    expect(authGuard.canActivate()).toBeFalse(); 
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); 
  });
});
