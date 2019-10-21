import { Company } from './company';

export class Category {
  Name: string;
  Description: string;
  CategoryCode: string;
  Companies: Company[] = [];
}
