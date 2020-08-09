import { TraitModel } from './trait.model';

export interface ProfileModel {
    word_count: number;
    word_count_message: string;
    processed_language: string;
    personality: Array<TraitModel>;
    needs: Array<TraitModel>;
    values: Array<TraitModel>;
    warnings: unknown;
}
