export const FORM_FIELDS = {
    fields: [
        {
            name: "unit_name",
            type: "text",
            readonly: true
        },
        {
            name: "clinic_manager",
            type: "text",
            readonly: true
        },
        {
            name: "incharge_nurse",
            type: "text",
            readonly: true
        },
        {
            name: "phone",
            type: "tel",
            readonly: true
        },
        {
            name: "fax",
            type: "tel",
            readonly: true
        },
        {
            name: "email",
            type: "email",
            readonly: true
        },
        {
            name: "family_name",
            type: "text",
            readonly: false
        },
        {
            name: "first_name",
            type: "text",
            readonly: false
        },
        {
            name: "id",
            type: "number",
            readonly: false
        },
        {
            name: "date_of_birth",
            type: "date",
            readonly: false
        },
        {
            name: "age",
            type: "number",
            readonly: false
        },
        {
            name: "gender",
            type: "select",
            options: [
                { value: "male", label: "זכר" },
                { value: "female", label: "נקבה" }
            ],
            readonly: false
        },
        {
            name: "health_insurance_name",
            type: "select",
            options: [
                { value: "leumit", label: "Leumit" },
                { value: "macabi", label: "Macabi" },
                { value: "clalit", label: "Clalit" },
                { value: "meuhedet", label: "Meuhedet" }
            ],
            readonly: false
        },
        {
            name: "address",
            type: "text",
            readonly: false
        },
        {
            name: "date",
            type: "date",
            readonly: false
        },
        {
            name: "hour",
            type: "time",
            readonly: false
        },
        {
            name: "visit_number",
            type: "number",
            readonly: false
        }
    ]
};