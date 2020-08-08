export interface FileModel {
    userID: string;
    fileName: string;
    size: number;
    isAdequateForAnalysis: boolean;
    contents: string;
}
