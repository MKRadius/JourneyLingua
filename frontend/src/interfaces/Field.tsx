export interface StateField {
    id: number;
    type: string;
    value: string;
    placeholder: string;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
}