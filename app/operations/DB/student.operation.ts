import { ObjectId } from 'bson';
import STUDENT from '../../models/Student';
import { Student } from '../../types';

export const createStudent = async (student: Student): Promise<any> => {
  const createdStudent = new STUDENT(student);
  const resposeStudentTask = await createdStudent.save();
  return resposeStudentTask;
};

export const findStudentById = async (id: ObjectId): Promise<any> =>
  STUDENT.findById(id);

export const findStudentNameById = async (id: ObjectId): Promise<any> =>
  STUDENT.findById(id, 'name');

export const findStudentByName = async (name: string): Promise<any> =>
  STUDENT.findOne({ name });

export const findStudentByNickname = async (nickname: string): Promise<any> =>
  STUDENT.findOne({ nickname });

export const updateStudentById = async (
  id: ObjectId,
  student: Student,
): Promise<any> => STUDENT.findByIdAndUpdate(id, student, { new: true });

export const deleteStudentById = async (id: ObjectId): Promise<any> =>
  STUDENT.findByIdAndDelete(id);
