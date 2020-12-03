import { Role } from './role.enum'
export class User {
  constructor(
    public email: string,
    public id: string,
    public role: Role,
    private _token: string,
    private _tokenExpirationDate: Date
  ){}

  get userRole(){
    if(this.email.toLowerCase().includes('cashier')){
      this.role = Role.Cashier
    } else if (this.email.toLowerCase().includes('clerk')){
      this.role = Role.Clerk
    } else if(this.email.toLowerCase().includes('manager')){
      this.role = Role.Manager
    } else{
      this.role = Role.None
    }
    return this.role
  } 

  get token(){
    //if no token or token expires
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null
    }
    return this._token
  }
  
}

// set a token when creating new user object
// it always creates a new User object when the user logs in