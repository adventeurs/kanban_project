export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  stripeCustomerId?: string;
  admin?: boolean;
  abandonedCart?: Date;
}
