import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'
import {DecodedToken} from "../../../core/models/JWT";
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  DecodeToken(token: string):DecodedToken {
    return jwt_decode(token);
  }

}
