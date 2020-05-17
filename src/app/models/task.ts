export class Task {

  id: number
  name: string
  completed: boolean

  constructor(name: string, completed?: boolean, id?: number) {
    this.name = name
    this.completed = completed
    this.id = id
  }

  static fromJSON(data: Task){
    return new Task(data.name, data.completed, data.id)
  }


}
