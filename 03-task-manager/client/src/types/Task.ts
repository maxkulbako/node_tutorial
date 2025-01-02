export interface BaseTask {
  name: string;
  completed: boolean;
}

export interface ITask extends BaseTask {
  _id: string;
}
