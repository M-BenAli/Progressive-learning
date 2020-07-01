export class User {

  id: number;
  email: string;
  admin: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(id: number, email: string,  admin: boolean, createdAt?: number, updatedAt?: number) {
    this.id = id;
    this.email = email;
    this.admin = admin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(data) {
    return new User(data.id, data.email, data.admin, data.createdAt, data.updatedAt);
  }

  static deepCopy(user: User) {
    return Object.assign({}, user)
  }

}
