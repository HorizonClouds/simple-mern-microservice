import ExampleModel from '../models/exampleModel.js';
import { NotFoundError } from '../utils/customErrors.js';

export const getAllExamples = async () => {
  return await ExampleModel.find({});
};

export const createExample = async (data) => {
  const newExample = new ExampleModel(data);
  return await newExample.save();
};

export const getExampleById = async (id) => {
  const example = await ExampleModel.findById(id);
  if (!example) {
    throw new NotFoundError('Example not found');
  }
  return example;
};

export const updateExample = async (id, data) => {
  const updatedExample = await ExampleModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedExample) {
    throw new NotFoundError('Example not found');
  }
  return updatedExample;
};

export const deleteExample = async (id) => {
  const deletedExample = await ExampleModel.findByIdAndDelete(id);
  if (!deletedExample) {
    throw new NotFoundError('Example not found');
  }
  return deletedExample;
};

export default {
  getAllExamples,
  createExample,
  getExampleById,
  updateExample,
  deleteExample,
};
