import { SoftSkill } from '../../types/';
import { createSoftSkill, getAllSoftSkill } from '../DB/softSkill.operation';

const LIST_0F_SOFTSKILLS = [
    'Trabajo en equipo',
    'Comunicación',
    'Confianza',
    'Honestidad',
    'Pensamiento Crítico',
    'Liderazgo',
    'Habilidades de escritura',
    'Creatividad',
    'Aprendizaje Continuo',
    'Toma de decisiones'
];

const insertListOfSoftSkill = async (softSkills: string[]) => {
    const promiseInsertedSoftSkills = softSkills.map(softSkill => {
        const newSoftSkill = {} as SoftSkill;
        newSoftSkill.name = softSkill;
        createSoftSkill(newSoftSkill);
    });
    Promise.all(promiseInsertedSoftSkills);
};

export const insertSoftSkills = async () => {
    const actualSoftSkills = await getAllSoftSkill();
    if (actualSoftSkills.length === LIST_0F_SOFTSKILLS.length) {
        insertListOfSoftSkill(LIST_0F_SOFTSKILLS);
    }
};
