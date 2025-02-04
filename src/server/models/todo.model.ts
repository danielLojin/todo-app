import { model, Schema } from "mongoose";

export interface ITodo {
  text: string;
  finished: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    text: { type: String, required: true },
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
