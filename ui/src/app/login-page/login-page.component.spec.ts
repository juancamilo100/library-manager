import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../services/auth/auth.service';

class MockAuthService {
  login = jasmine.createSpy('login').and.returnValue(of({}));
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() when form is submitted with valid data', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.loginForm.setValue({
      username: 'sampleUser',
      password: 'samplePassword',
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledOnceWith(
      'sampleUser',
      'samplePassword'
    );

    expect(navigateSpy).toHaveBeenCalledOnceWith(['/']);
  });

  it('should not call onSubmit() when form is submitted with invalid data', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.loginForm.setValue({
      username: 'sampleUser',
      password: ''
    });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
