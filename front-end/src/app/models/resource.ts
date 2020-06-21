export enum ResourceTypes {
  Wikipedia = "Wikipedia",
  Github = "Github",
  Book = "Book",
  ScientificPaper = "Scientific paper"
}

export class Resource {

  url: string;
  type: ResourceTypes;
  createdAt: string;
  updatedAt: string;
  id: number;

  constructor(url: string, type: ResourceTypes,
              createdAt?: string, updatedAt?: string,
              id?: number) {
    this.url = url;
    this.type = type;
    this.id = id;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  static fromJSON(data): Resource {
    return new Resource(data.url, data.type, data.createdAt,
      data.updatedAt, data.id);
  }


}
