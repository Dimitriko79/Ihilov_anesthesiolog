import {useSelector} from "react-redux";

const CATEGORY_TRANSLATION = {
    "פרטי המטופל": "patientDetails",
    "נתוני הביקור": "visitData",
    "פרטי ניתוח": "surgeryDetails",
    "מאושר לניתוח": "approvedForSurgery",
    "הרגלים": "habits",
    "אלרגיות ורגישויות": "allergiesAndSensitivities",
    "אבחנות רקע": "backgroundDiagnoses",
    "רקע רפואי": "medicalBackground",
    "ניתוח מיועד": "intendedAnalysis",
    "סיבת הניתוח": "reasonForSurgery",
    "מחלה נוכחית": "currentIllness",
    "ניתוחים בעבר": "pastSurgeries",
    "טיפול תרופתי קבוע": "regularMedicationTreatment",
    "הסטוריה הרדמתית": "anestheticHistory",
    "ASA": "asa",
    "Frail scale": "frailScale",
    "RCRI": "rcri",
    "מדדים": "measurements",
    "STOP-BANG": "stopBang",
    "Clinical Frailty Scale": "clinicalFrailtyScale",
    "Mini COG": "miniCog",
    "Functional Capacity": "functionalCapacity",
    "OSA": "osa",
    "Timed Up And Go Test": "timedUpAndGoTest",
    "Frail scale ציוני אומדנים": "frailScaleAssessmentScores",
    "בדיקה גופנית": "physicalExamination",
    "בדיקות מעבדה, הדמיות ובדיקות עזר": "laboratoryTestsImagingAndAuxiliaryTests",
    "יועצים": "consultants",
    "Ariscat Score": "ariscatScore",
    "סיכום": "summary"
};

export const usePreviewForm = () => {
    const { data } = useSelector(state => state.data);

    function assignCategories(data) {
        const orderedMap = new Map();

        Object.values(data).forEach(entry => {
            const translatedKey = CATEGORY_TRANSLATION[entry.name_category] || null;
            if (translatedKey) {
                orderedMap.set(translatedKey, entry);
            }
        });

        return Object.fromEntries(orderedMap);
    }

    const categoryData = assignCategories(data);

    return {
        categoryData
    }
}