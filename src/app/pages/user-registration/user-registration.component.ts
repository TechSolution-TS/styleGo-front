import { CommonModule, NgIf, NgFor, NgClass,  } from '@angular/common';
import { Component,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  formData = {
    name: '',
    address: '',
    password: '',
    confirmPassword: '',
    isBarber: false
  };


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
    console.log(this.formData);
    // Lógica para enviar os dados do formulário para o backend
  }
}
