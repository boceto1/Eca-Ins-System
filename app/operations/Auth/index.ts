import sha256 from 'crypto-js/sha256';
import { ObjectId } from 'bson';
import { Professor, Student } from '../../types';
import { createNewLoginToken, createNewPortfolioToken } from '../Auth/jwt';
import {
  createProfessor,
  findProfessorByNickname,
} from '../DB/professor.operation';
import { createStudent, findStudentByNickname } from '../DB/student.operation';
import { exportKey, generateKeys } from './crypto';

interface StudentInfoRequest {
  nickname: string;
  password: string;
  name: string;
}

interface ProfessorInfoRequest {
  name: string;
  nickname: string;
  speciality: string;
  password: string;
}

interface StudentResponse {
  nickname: string;
  keys: object;
}

interface ProfessorResponse {
  nickname: string;
  speciality: string;
  keys: object;
}

interface LoginInfoRequest {
  nickname: string;
  password: string;
  type: 'student' | 'professor';
}

export const signUpStudent = async (
  studentInfoRequest: StudentInfoRequest,
): Promise<StudentResponse> => {
  const newStudent = {} as Student;
  newStudent.nickname = studentInfoRequest.nickname;
  newStudent.name = studentInfoRequest.name;
  newStudent.password = sha256(studentInfoRequest.password);
  const key = generateKeys();
  newStudent.keys = {
    privateKey: exportKey(key, 'private'),
    publicKey: exportKey(key, 'public'),
  };
  const registeredStudent = await createStudent(newStudent);

  return {
    nickname: registeredStudent.nickname,
    keys: registeredStudent.keys,
  };
};

export const signUpProfessor = async (
  professorInfoRequest: ProfessorInfoRequest,
): Promise<ProfessorResponse> => {
  const newProfessor = {} as Professor;
  newProfessor.name = professorInfoRequest.name,
  newProfessor.nickname = professorInfoRequest.nickname;
  newProfessor.password = sha256(professorInfoRequest.password);
  newProfessor.speciality = professorInfoRequest.speciality;

  const key = generateKeys();
  newProfessor.keys = {
    privateKey: exportKey(key, 'private'),
    publicKey: exportKey(key, 'public'),
  };
  const registeredProfessor = await createProfessor(newProfessor);

  return {
    nickname: registeredProfessor.nickname,
    speciality: registeredProfessor.speciality,
    keys: registeredProfessor.keys,
  };
};

export const login = async (
  loginInfoRequest: LoginInfoRequest,
): Promise<any> => {
  const { nickname, password, type } = loginInfoRequest;

  if (type === 'student') {
    const user = await findStudentByNickname(nickname);
    if (!user) {
      return null;
    }

    if (sha256(password).toString() !== user.password) {
      return null;
    }

    return createNewLoginToken({ id: user._id, name: user.name, type });
  }

  if (type === 'professor') {
    const user = await findProfessorByNickname(nickname);
    if (!user) {
      return null;
    }

    if (sha256(password).toString() !== user.password) {
      return null;
    }

    return createNewLoginToken({ id: user._id, name: user.name, type });
  }
};

export const sharePortfolio = async( idStudent) => {
  return createNewPortfolioToken({ idStudent: new ObjectId(idStudent) });
}