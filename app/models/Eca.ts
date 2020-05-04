import { model, Schema } from 'mongoose';

const extracurricularActivitySchema = new Schema({
    title: { type: String, required: true },
    idStudent: { type: String, required: true },
    idProfessor: { type: String, required: true },
    description: { type: String, required: true },
    evidenceLink: { type: String, required: true },
    professorSignature: { type: String, default: null },
    studentSignature: { type: String, required: true },
    softSkills: { type: [String], default: null }
});

export default model('ExtracurricularActivity', extracurricularActivitySchema);
