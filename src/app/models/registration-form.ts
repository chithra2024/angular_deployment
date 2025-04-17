export interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  preferredDate: Date;
  numberOfGuests: number;
  vehicleInterest: string;
  specialRequirements?: string;
}
