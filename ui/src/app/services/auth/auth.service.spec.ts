import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const mockResponse = { access_token: 'mock_access_token' };

    authService.login(username, password).subscribe((result) => {
      expect(result).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);
    });

    const req = httpTestingController.expectOne(`${authService['url']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const errorMessage = 'Login failed';

    authService.login(username, password).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(authService.isAuthenticated()).toBe(false);
      },
    });

    const req = httpTestingController.expectOne(`${authService['url']}/login`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent(errorMessage));
  });

  it('should logout successfully', () => {
    authService.logout();
    expect(authService.isAuthenticated()).toBe(false);
  });
});
