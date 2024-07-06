import { SetMetadata } from '@nestjs/common';

export const ONLY_TEACHERS_KEY = 'onlyTeachers';
export const OnlyTeachers = () => SetMetadata(ONLY_TEACHERS_KEY, true);
