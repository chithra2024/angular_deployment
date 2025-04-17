import { Injectable } from '@angular/core';
import { RegistrationForm } from '../models/registration-form';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registrations: RegistrationForm[] = [];
  private registrationsSubject = new BehaviorSubject<RegistrationForm[]>([]);

  constructor() { }

  addRegistration(registration: RegistrationForm): Observable<RegistrationForm> {
    this.registrations.push(registration);
    this.registrationsSubject.next(this.registrations);
    return of(registration);
  }

  getRegistrations(): Observable<RegistrationForm[]> {
    return this.registrationsSubject.asObservable();
  }
}
