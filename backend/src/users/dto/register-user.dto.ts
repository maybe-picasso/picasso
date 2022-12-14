export class RegisterUserDto {
  userId: string;
  email: string;
  displayName: string;
  profileUrl: string;
  locale: string;
  registerType: string; // oauth 서비스 | 자체 가입 (추후)
  lastLoginDate: number;
  avatar: number[];
  score: number;
}

// {
//   id: '107249667742323933144',
//   displayName: 'JS Park',
//   name: { familyName: undefined, givenName: 'JS Park' },
//   emails: [ { value: 'dodortus@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/AEdFTp5OpOTMXvJ9DQiAfhGQY_FhUn1VXUAVjUqgmqsLA8w=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "107249667742323933144",\n' +
//     '  "name": "JS Park",\n' +
//     '  "given_name": "JS Park",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/AEdFTp5OpOTMXvJ9DQiAfhGQY_FhUn1VXUAVjUqgmqsLA8w\\u003ds96-c",\n' +
//     '  "email": "dodortus@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "ko"\n' +
//     '}',
//   _json: {
//     sub: '107249667742323933144',
//     name: 'JS Park',
//     given_name: 'JS Park',
//     picture: 'https://lh3.googleusercontent.com/a/AEdFTp5OpOTMXvJ9DQiAfhGQY_FhUn1VXUAVjUqgmqsLA8w=s96-c',
//     email: 'dodortus@gmail.com',
//     email_verified: true,
//     locale: 'ko'
//   }
