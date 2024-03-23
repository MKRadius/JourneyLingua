import { StateField } from "../interfaces/Field";

export const createInputField = (
    id: number,
    type: string,
    value: string,
    placeholderId: string, // Accept message ID for placeholder
    setValue: React.Dispatch<React.SetStateAction<string>>
): StateField => ({
    id,
    type,
    value,
    placeholderId, // Store message ID in the placeholderId property
    func: (e) => setValue(e.target.value)
});