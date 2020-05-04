import { model, Schema } from 'mongoose';

const softSkillSchema = new Schema({
    name: { type: String, required: true },
});

export default model('SoftSkill', softSkillSchema);
