export class User {

  id: number;
  username: string;
  password: string;
  admin: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(id: number, username: string, password: string, admin: boolean,
              createdAt?: number, updatedAt?: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.admin = admin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(data) {
    return new User(data.id, data.username, data.password, data.admin,
      data.createdAt, data.updatedAt);
  }

}
