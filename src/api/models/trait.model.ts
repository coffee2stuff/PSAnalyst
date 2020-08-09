export interface TraitModel {
    trait_id: string;
    name: string;
    category: string;
    percentile: number;
    significant: boolean;
    children?: Array<TraitModel>;
}
