import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AUTH_SERVICE, AuthenticationService } from '../services/auth.service';
import { LoginRequest } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected loginForm;
  protected loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(AUTH_SERVICE) private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loginError = null; // clear old errors

    const loginRequest: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(loginRequest).subscribe({
      next: (res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        // SnackBar popup
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        if (err.status === 501) {
          this.snackBar.open('Page not found.', 'Close', { duration: 4000 });
          return;
        }

        if (err.status === 503) {
          this.snackBar.open(
            'Service temporarily unavailable. Please try again later.',
            'Close',
            { duration: 4000 }
          );
          return;
        }

        // Default fallback
        this.snackBar.open('Something went wrong. Please try again.', 'Close', {
          duration: 4000,
        });

        // if (err.status === 500) {
        //   this.snackBar.open(
        //     'Service unavailable. Please try again later.',
        //     'Close',
        //     { duration: 5000 }
        //   );
        //   return;
        // }

        // if (err.status === 404) {
        //   this.loginError = 'Invalid username or password.';
        // } else {
        //   this.loginError = 'Unexpected error occurred. Please try again.';
        // }
      },
    });
  }
}
