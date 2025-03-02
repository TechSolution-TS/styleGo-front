import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarberService } from '../../services/barber.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private barberService: BarberService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.barberService.login(email, password).subscribe({
        next: (response) => {
          this.barberService.saveUserSession(response.token, response.userUuid, email, password);
          this.router.navigate(['/barber-listing']);
        },
        error: (error) => {
          this.errorMessage = 'Credenciais inválidas! Tente novamente.';
          console.error('Erro ao fazer login:', error);
        }
      });

    } else {
      this.errorMessage = 'Preencha os campos corretamente!';
    }
  }

  goToRegister(){
    this.router.navigate([`/register`]);
  }

}
