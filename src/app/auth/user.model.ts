export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ){}

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