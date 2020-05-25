import express from 'express';
import studentRoute from '../routes/student.route';
import ecaRoute from './eca.router';
import professorRoute from './professor.route';
import softSkills from './softSkill.router';
import authRoutes from './auth.router';

const app = express();

app.use('/auth', authRoutes);
app.use('/students', studentRoute);
app.use('/professors', professorRoute);
app.use('/ecas', ecaRoute);
app.use('/softSkills', softSkills);

module.exports = app;