import sha256 from 'crypto-js/sha256';
import { Professor, Student } from '../../types';
import { createNewToken } from '../Auth/jwt';
import {
  createProfessor,
  findProfessorByName,
} from '../DB/professor.operation';
import { createStudent, findStudentByName } from '../DB/student.operation';
import { exportKey, generateKeys } from './crypto';

interface StudentInfoRequest {
  name: string;
  password: string;
}

interface ProfessorInfoRequest {
  name: string;
  speciality: string;
  password: string;
}

interface StudentResponse {
  name: string;
  keys: object;
}

interface ProfessorResponse {
  name: string;
  speciality: string;
  keys: object;
}

interface LoginInfoRequest {
  name: string;
  password: string;
  type: 'student' | 'professor';
}

export const signUpStudent = async (
  studentInfoRequest: StudentInfoRequest,
): Promise<StudentResponse> => {
  const newStudent = {} as Student;
  newStudent.name = studentInfoRequest.name;
  newStudent.password = sha256(studentInfoRequest.password);
  const key = generateKeys();
  newStudent.keys = {
    privateKey: exportKey(key, 'private'),
    publicKey: exportKey(key, 'public'),
  };
  const registeredStudent = await createStudent(newStudent);

  return {
    name: registeredStudent.name,
    keys: registeredStudent.keys,
  };
};

export const signUpProfessor = async (
  professorInfoRequest: ProfessorInfoRequest,
): Promise<ProfessorResponse> => {
  const newProfessor = {} as Professor;
  newProfessor.name = professorInfoRequest.name;
  newProfessor.password = sha256(professorInfoRequest.password);
  newProfessor.speciality = professorInfoRequest.speciality;

  const key = generateKeys();
  newProfessor.keys = {
    privateKey: exportKey(key, 'private'),
    publicKey: exportKey(key, 'public'),
  };
  const registeredProfessor = await createProfessor(newProfessor);

  return {
    name: registeredProfessor.name,
    speciality: registeredProfessor.speciality,
    keys: registeredProfessor.keys,
  };
};

export const login = async (
  loginInfoRequest: LoginInfoRequest,
): Promise<any> => {
  const { name, password, type } = loginInfoRequest;

  if (type === 'student') {
    const user = await findStudentByName(name);
    if (!user) {
      return null;
    }

    if (sha256(password).toString() !== user.password) {
      return null;
    }

    return createNewToken({ id: user._id, name: user.name, type });
  }

  if (type === 'professor') {
    const user = await findProfessorByName(name);
    if (!user) {
      return null;
    }

    if (sha256(password).toString() !== user.password) {
      return null;
    }

    return createNewToken({ id: user._id, name: user.name, type });
  }
};
