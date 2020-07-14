import { model, Schema } from 'mongoose';

const keysSchema = new Schema({
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
});

const professorSchema = new Schema({
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    speciality: { type: String, required: true },
    keys: keysSchema,
});

export default model('Professor', professorSchema);
