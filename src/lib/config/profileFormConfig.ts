import { IProfileInfoInputField } from "../types/update-profile-types";

export const profileInfoFormData: IProfileInfoInputField[] = [
  {
    id: "PIIFD-1",
    name: "firstName",
    label: "Name",
    required: false,
    disabled: false,
    placeholder: "John"
  },
  {
    id: "PIIFD-2",
    name: "lastName",
    label: "Surname",
    required: false,
    disabled: false,
    placeholder: "Doe"
  },
  {
    id: "PIIFD-3",
    name: "email",
    label: "Email",
    required: false,
    disabled: true,
    placeholder: "example@example.com"
  },
  {
    id: "PIIFD-4",
    name: "phoneNumber",
    label: "Phone number",
    required: false,
    disabled: false,
    // TODO: update this placeholder according to proper phone number validation
    placeholder: "555 555 555"
  },
];