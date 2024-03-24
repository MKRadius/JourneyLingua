import { StateField } from "../interfaces/Field";
import { Dispatch, SetStateAction } from "react";

export const createInputField = (
  id: number,
  type: string,
  value: string,
  placeholder: string,
  setValue: Dispatch<SetStateAction<string>>
): StateField => ({
  id,
  type,
  value,
  placeholder,
  func: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
});