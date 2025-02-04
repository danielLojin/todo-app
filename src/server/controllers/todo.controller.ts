import { RequestHandler } from "express";
import Todo, { ITodo } from "../models/todo.model.ts";
import { dataResponse, errorResponse } from "../helpers/helpers.ts";
import mongoose from "mongoose";

export const getTodos: RequestHandler = async (req, res) => {
  try {
    const todos = await Todo.find({});

    if (!todos) return res.status(404).json(errorResponse("No todos found."));

    res.status(200).json(dataResponse<ITodo[]>(todos));
  } catch (error) {
    if (error instanceof Error) console.log(`Error: ${error.message}`);
    else console.log(`Unexpected error: ${error}`);

    res.status(500).json(errorResponse("Internal server error."));
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  try {
    const { text }: ITodo = req.body;

    if (!text)
      return res.status(400).json(errorResponse("Missing required fields."));

    const newTodo = new Todo({ text });
    await newTodo.save();

    res
      .status(201)
      .json(dataResponse<string>("New to-do successfully created."));
  } catch (error) {
    if (error instanceof Error) console.log(`Error: ${error.message}`);
    else console.log(`Unexpected error: ${error}`);

    res.status(500).json(errorResponse("Internal server error."));
  }
};

export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    const todo: ITodo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json(errorResponse("Invalid Todo id."));

    if (!todo.text)
      return res.status(400).json(errorResponse("Missing required fields."));

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });

    if (!updatedTodo)
      return res.status(400).json(errorResponse("Todo could not be updated."));

    res.status(200).json(dataResponse<string>("To-do successfully created."));
  } catch (error) {
    if (error instanceof Error) console.log(`Error: ${error.message}`);
    else console.log(`Unexpected error: ${error}`);

    res.status(500).json(errorResponse("Internal server error."));
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json(errorResponse("Invalid Todo id."));

    await Todo.findByIdAndDelete(id);

    res.status(200).json(dataResponse<string>("To-do successfully deleted."));
  } catch (error) {
    if (error instanceof Error) console.log(`Error: ${error.message}`);
    else console.log(`Unexpected error: ${error}`);

    res.status(500).json(errorResponse("Internal server error."));
  }
};
