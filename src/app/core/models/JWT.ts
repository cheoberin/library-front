export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  roles: string[];
}
