import { Injectable } from '@angular/core';
import { User } from '../common/interface/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user!: User;

  isTaskBoardForce: boolean = false;
  isProfileForce: boolean = false;

  constructor() { }
}
