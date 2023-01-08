export class RegisterUserDto {
  userId: string;
  email: string;
  name: string;
  profileUrl: string;
  locale: string;
  registerType: string; // oauth 서비스 | 자체 가입 (추후)
  lastLoginDate: number;
  avatar: number[];
  point: number;
}
