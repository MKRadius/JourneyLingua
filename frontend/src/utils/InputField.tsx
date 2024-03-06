import { StateField } from "../interfaces/Field";

export const createInputField = (
    id: number,
    type: string,
    value: string,
    placeholder: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
): StateField => ({
    id,
    type,
    value,
    placeholder,
    func: (e) => setValue(e.target.value)
});