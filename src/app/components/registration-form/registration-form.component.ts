import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationForm } from '../../models/registration-form';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      preferredDate: ['', Validators.required],
      numberOfGuests: [1, [Validators.required, Validators.min(1)]],
      vehicleInterest: ['', Validators.required],
      specialRequirements: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData: RegistrationForm = this.registrationForm.value;
      this.registrationService.addRegistration(formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.registrationForm.reset({
            numberOfGuests: 1
          });
          alert('Registration submitted successfully!');
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
