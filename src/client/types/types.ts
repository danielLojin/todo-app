interface Todo {
  _id: string;
  text: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  changing?: boolean;
}

type Todos = Todo[];

type FetchResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };
