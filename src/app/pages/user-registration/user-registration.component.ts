import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  selectedImage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage: string = '';
  successMessage: string = '';

  formData = {
    name: '',
    email: '',
    address: '',
    city: '',
    complement: '',
    neighborhood: '',
    number: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    confirmPassword: '',
    userType: null
  };

  constructor(private registrationService: UserRegistrationService, private router: Router) {}

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.formData.userType) {
      this.errorMessage = "Selecione o tipo de usuário: Cliente ou Prestador de Serviço.";
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = "As senhas não coincidem.";
      return;
    }

    const userPayload = {
      name: this.formData.name,
      email: this.formData.email,
      imageUrl: this.selectedImage || "https://placehold.co/600x400/png",
      address: this.formData.address,
      city: this.formData.city,
      complement: this.formData.complement,
      neighborhood: this.formData.neighborhood,
      number: this.formData.number,
      state: this.formData.state,
      zipCode: this.formData.zipCode,
      country: this.formData.country,
      password: this.formData.password
    };

    if (this.formData.userType === 'client') {
      this.registrationService.registerClient(userPayload).subscribe({
        next: () => {
          this.successMessage = "Cadastro realizado com sucesso!";
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: () => {
          this.errorMessage = "Erro ao cadastrar usuário. Tente novamente.";
        }
      });
    } else {
      const barberPayload = {
        type: 1,
        user: userPayload
      };

      this.registrationService.registerBarber(barberPayload).subscribe({
        next: () => {
          this.successMessage = "Cadastro realizado com sucesso!";
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: () => {
          this.errorMessage = "Erro ao cadastrar usuário. Tente novamente.";
        }
      });
    }
  }
}
