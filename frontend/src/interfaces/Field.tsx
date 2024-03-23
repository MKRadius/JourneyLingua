export interface StateField {
    id: number;
    type: string;
    value: string;
    placeholderId: string; 
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
}