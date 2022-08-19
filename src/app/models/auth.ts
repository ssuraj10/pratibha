export interface AuthDTO {
  username: string;
  password: string;

}
export interface AuthDTOregister {
  phone: string;
}
export type AuthType = 'login' | 'register-verify-phone';
