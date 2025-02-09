import {useCallback, useRef, useState} from 'react';
import {updateData, updateView} from "../../reducers/anesthesiaSheetReducer.js";
import {useDispatch} from "react-redux";
import S3Service from "../../services/S3Service.js";
import axios from 'axios';

const FOLDER = "folder-in-s3";
const categories = [
    {
        "children": [
            {
                "name_category": "שם יחידה",
                "readonly": true,
                "type_field": "text",
                "value": "מרפאה טרום הרדמה"
            },
            {
                "name_category": "מנהל/ת מרפאה",
                "readonly": true,
                "type_field": "text",
                "value": "פרופ' מטות עידית מ.ר 19898"
            },
            {
                "name_category": "אחות אחראית",
                "readonly": true,
                "type_field": "text",
                "value": "מג'די אבו סאלח"
            },
            {
                "name_category": "טלפון ",
                "readonly": true,
                "type_field": "text",
                "value": "03-6925794"
            },
            {
                "name_category": "פקס",
                "readonly": true,
                "type_field": "text",
                "value": "03-6974014"
            },
            {
                "name_category": "דואל",
                "readonly": true,
                "type_field": "text",
                "value": "sourasky@gmail.com"
            },
            {
                "name_category": "שם המשפחה",
                "readonly": false,
                "type_field": "text",
                "value": "פוקס"
            },
            {
                "name_category": "שם פרטי",
                "readonly": false,
                "type_field": "text",
                "value": "טל"
            },
            {
                "name_category": "ת.ז",
                "readonly": false,
                "type_field": "text",
                "value": "KKKB"
            },
            {
                "name_category": "תאריך לידה",
                "readonly": false,
                "type_field": "date",
                "value": "01/01/1945"
            },
            {
                "name_category": "גיל",
                "readonly": false,
                "type_field": "number",
                "value": 79
            },
            {
                "name_category": "פלאפון",
                "readonly": false,
                "type_field": "text",
                "value": "02-9949506"
            },
            {
                "name_category": "מין",
                "options": [
                    "זכר",
                    "נקבה"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "זכר"
            },
            {
                "name_category": "מבוטח בקופה",
                "options": [
                    "לאומית",
                    "מכבי",
                    "כללית",
                    "מאוחדת",
                    "ללא"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "כללית"
            },
            {
                "name_category": "כתובת",
                "readonly": false,
                "type_field": "text",
                "value": "שדרות יצחק רבין 10, ירושלים"
            }
        ],
        "name_category": "פרטי המטופל"
    },
    {
        "children": [
            {
                "name_category": "תאריך",
                "readonly": false,
                "type_field": "date",
                "value": ""
            },
            {
                "name_category": "שעה",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "מספר ביקור",
                "readonly": false,
                "type_field": "number",
                "value": ""
            }
        ],
        "name_category": "נתוני הביקור"
    },
    {
        "children": [
            {
                "name_category": "האם מאושר",
                "options": [
                    "כן",
                    "לא",
                    "לא מאושר זמני"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "הערות",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "מאושר לניתוח"
    },
    {
        "children": [
            {
                "name_category": "ניתוח מיועד",
                "readonly": false,
                "type_field": "text",
                "value": "מיפוי לב"
            },
            {
                "name_category": "סיבת הניתוח",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "מחלה נוכחית",
                "readonly": false,
                "type_field": "text",
                "value": "ANGINA PECTORIS"
            }
        ],
        "name_category": "פרטי ניתוח"
    },
    {
        "children": [
            {
                "children": [
                    {
                        "name_category": "האם מעשן",
                        "options": [
                            "כן",
                            "לא",
                            "עישון בעבר"
                        ],
                        "readonly": false,
                        "type_field": "text",
                        "value": "לא"
                    },
                    {
                        "name_category": "כמות קופסאות ליום",
                        "readonly": false,
                        "type_field": "number",
                        "value": 0
                    },
                    {
                        "name_category": "כמות שנים",
                        "readonly": false,
                        "type_field": "number",
                        "value": 0
                    }
                ],
                "name_category": "עישון"
            },
            {
                "name_category": "שימוש מוגבר באלכוהול",
                "options": [
                    "כן",
                    "לא"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "לא"
            },
            {
                "name_category": "שימוש בסמים",
                "options": [
                    "כן",
                    "לא"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "לא"
            },
            {
                "name_category": "שינה",
                "options": [
                    "תקינה",
                    "מופרעת"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "תקינה"
            },
            {
                "name_category": "פעילות גופנית קבועה",
                "options": [
                    "לא",
                    "כן"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "לא"
            }
        ],
        "name_category": "הרגלים"
    },
    {
        "children": [
            {
                "name_category": "אלרגיות ורגישויות",
                "readonly": false,
                "type_field": "text",
                "value": "לא צוין"
            }
        ],
        "name_category": "אלרגיות ורגישויות"
    },
    {
        "name_category": "אבחנות רקע",
        "rows": [
            {
                "values": [
                    {
                        "name_category": "שם אבחנה",
                        "readonly": false,
                        "type_field": "text",
                        "value": "ANGINA PECTORIS"
                    },
                    {
                        "name_category": "קוד",
                        "readonly": false,
                        "type_field": "number",
                        "value": ""
                    },
                    {
                        "name_category": "צד",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "S/P",
                        "readonly": false,
                        "type_field": "boolean",
                        "value": false
                    },
                    {
                        "name_category": "M/P",
                        "readonly": false,
                        "type_field": "boolean",
                        "value": false
                    },
                    {
                        "name_category": "Rec",
                        "readonly": false,
                        "type_field": "date",
                        "value": ""
                    }
                ]
            }
        ],
        "type_field": "table"
    },
    {
        "children": [
            {
                "name_category": "רקע רפואי",
                "readonly": false,
                "type_field": "text",
                "value": "איסכמיה בינונית בתפוצה של ה-RCA לאחר מתן דיפרידמול. הפרפוזיה ליתר דפנות חדר שמאל תקינה ללא עדות לאוטם. LVEF=65%. התכווצות תקינה של דפנות חדר שמאל."
            }
        ],
        "name_category": "רקע רפואי"
    },
    {
        "name_category": "ניתוחים בעבר",
        "rows": [
            {
                "values": [
                    {
                        "name_category": "שם הניתוח",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "מועד הניתוח",
                        "readonly": false,
                        "type_field": "date",
                        "value": ""
                    }
                ]
            }
        ],
        "type_field": "table"
    },
    {
        "name_category": "טיפול תרופתי קבוע",
        "rows": [
            {
                "values": [
                    {
                        "name_category": "שם התרופה",
                        "readonly": false,
                        "type_field": "text",
                        "value": "Beta Blockers"
                    },
                    {
                        "name_category": "מינון",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "תדירות",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "מועד תחילת טיפול",
                        "readonly": false,
                        "type_field": "date",
                        "value": ""
                    }
                ]
            }
        ],
        "type_field": "table"
    },
    {
        "children": [
            {
                "name_category": "אין בעיות הרדמה במשפחה",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "בעיות ידועות בהרדמה",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "PONV",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "Difficult Airway",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "MH",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "Pseudocholinesterase Deficiency",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "Awareness Under Anesthesia ",
                "options": [
                    "true",
                    "false"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            },
            {
                "name_category": "Other ",
                "options": [
                    "true",
                    "false",
                    "other"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "false"
            }
        ],
        "name_category": "הסטוריה הרדמתית"
    },
    {
        "children": [
            {
                "name_category": "ASA score",
                "options": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "readonly": false,
                "type_field": "number",
                "value": ""
            }
        ],
        "name_category": "ASA"
    },
    {
        "children": [
            {
                "name_category": "Frail scale",
                "options": [
                    "Very Fit - בכושר מצויין לגילם. מתאמנים ופעילים גופנית תדיר",
                    "Well - בעיה רפואית מאוזנת. מתאמנים גופנית לסירוגין",
                    "Managin Well - בעיה רפואית מאוזנת. פעילות - הליכה בלבד.",
                    "Vulnerable - מחלה סימפטומטית שמקשה על פעילות. עצמאי, איטי, נעזר במקל.",
                    "Mildly Frail - נעזר בהליכון ו\\או זקוק לעזרה בפעילות מחוץ לבית.",
                    "Moderately Frail - זקוק לעזרה מחוץ ובתוך הבית ב-ADL ו\\או נעזר בהליכון.",
                    "Severely Frail - סיעודיים לחלוטין. צפויים לחיות יותר מ-6 חודשים. נעזרים בכיסא גלגלים.",
                    "Very Severely Frail - סיעודיים לחלוטין. מתקרבים לסוף חייהם. רזרבה אפסית.",
                    "Terminally Ill - עצמאיים, מחלה סופנית."
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "Frail scale"
    },
    {
        "children": [
            {
                "name_category": "Surgery Type",
                "options": [
                    " Intrabdominal",
                    "Intrathoracic",
                    "Vascular above inguinal ligament"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Unstable angina pectoris/Recent MI",
                "readonly": false,
                "type_field": "text",
                "value": "כן"
            },
            {
                "name_category": "History of CHF",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "הפרעת קצב משמעותית",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "הפרעה מסתמית משמעותית",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "History of CVA",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "Creatinine > 2mg/dL",
                "readonly": false,
                "type_field": "text",
                "value": "לא"
            },
            {
                "name_category": "Insulin Therapy",
                "readonly": false,
                "type_field": "text",
                "value": null
            }
        ],
        "name_category": "RCRI"
    },
    {
        "name_category": "מדדים",
        "rows": [
            {
                "values": [
                    {
                        "name_category": "תאריך",
                        "readonly": true,
                        "type_field": "date",
                        "value": "08/07/2024"
                    },
                    {
                        "name_category": "שעה",
                        "readonly": true,
                        "type_field": "date",
                        "value": null
                    },
                    {
                        "name_category": "דופק",
                        "readonly": true,
                        "type_field": "number",
                        "value": 71
                    },
                    {
                        "name_category": "לחץ דם",
                        "readonly": true,
                        "type_field": "number",
                        "value": "135/80"
                    },
                    {
                        "name_category": "סטורציה",
                        "readonly": true,
                        "type_field": "number",
                        "value": null
                    },
                    {
                        "name_category": "משקל",
                        "readonly": true,
                        "type_field": "number",
                        "value": null
                    }
                ]
            },
            {
                "values": [
                    {
                        "name_category": "תאריך",
                        "readonly": true,
                        "type_field": "date",
                        "value": "08/07/2024"
                    },
                    {
                        "name_category": "שעה",
                        "readonly": true,
                        "type_field": "date",
                        "value": null
                    },
                    {
                        "name_category": "דופק",
                        "readonly": true,
                        "type_field": "number",
                        "value": 73
                    },
                    {
                        "name_category": "לחץ דם",
                        "readonly": true,
                        "type_field": "number",
                        "value": "115/70"
                    },
                    {
                        "name_category": "סטורציה",
                        "readonly": true,
                        "type_field": "number",
                        "value": null
                    },
                    {
                        "name_category": "משקל",
                        "readonly": true,
                        "type_field": "number",
                        "value": null
                    }
                ]
            }
        ],
        "type_field": "table"
    },
    {
        "children": [
            {
                "name_category": "Snoring",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Tired",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Observed",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Hypertension",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "BMI>35",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "Age>50",
                "readonly": false,
                "type_field": "text",
                "value": "כן"
            },
            {
                "name_category": "Neck Diameter",
                "readonly": false,
                "type_field": "text",
                "value": null
            },
            {
                "name_category": "Gender",
                "options": [
                    "זכר",
                    "נקבה"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "זכר"
            }
        ],
        "name_category": "STOP-BANG"
    },
    {
        "children": [
            {
                "name_category": "Clinical Frailty Scale",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "Clinical Frailty Scale"
    },
    {
        "children": [
            {
                "name_category": "Mini COG",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "Mini COG"
    },
    {
        "children": [
            {
                "name_category": "Functional Capacity",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "Functional Capacity"
    },
    {
        "children": [
            {
                "name_category": "בדיקה כללית",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "מפתח פה",
                "options": [
                    "תקין",
                    "מוגבל"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "שיניים",
                "options": [
                    "שיניים קבועות יציבות",
                    "כתרים ושתלים יציבים",
                    "שיניים תותבות עליונות",
                    "שיניים תותבות תחתונות"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Mallampati",
                "options": [
                    "1 - נראות מלאה של השקדים, הענבל והחיך הרך",
                    "2 - נראות של החיך הקשה והרך, החלק העליון של השקדים והענבל",
                    "3 - נראות של החיך הקשה והרך ובסיס הענבל",
                    "4 - נראות של החיך הקשה בלבד"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "Thyromental Distance",
                "options": [
                    "גדול מ:7",
                    "קצר מ:7"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "תנועות צוואר",
                "options": [
                    "חופשיות",
                    "מוגבלות"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "היקף צוואר",
                "options": [
                    "קטן מ:40",
                    "עבה מ:40"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "הערות",
                "options": [
                    "קטן מ:40",
                    "עבה מ:40"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "בדיקה גופנית"
    },
    {
        "children": [
            {
                "children": [
                    {
                        "name_category": "המוגלובין",
                        "readonly": false,
                        "type_field": "text",
                        "value": "13.3 g/dL"
                    },
                    {
                        "name_category": "MCV",
                        "readonly": false,
                        "type_field": "text",
                        "value": "88.7 fl"
                    },
                    {
                        "name_category": "טסיות",
                        "readonly": false,
                        "type_field": "text",
                        "value": "209.0 K/µl"
                    },
                    {
                        "name_category": "WBC",
                        "readonly": false,
                        "type_field": "text",
                        "value": "12.5 K/µl"
                    },
                    {
                        "name_category": "נתרן",
                        "readonly": false,
                        "type_field": "text",
                        "value": "138 mEq/L"
                    },
                    {
                        "name_category": "אשלגן",
                        "readonly": false,
                        "type_field": "text",
                        "value": "4.2 mEq/L"
                    },
                    {
                        "name_category": "קראטנין",
                        "readonly": false,
                        "type_field": "text",
                        "value": "1.85 mg/dL"
                    },
                    {
                        "name_category": "Urea",
                        "readonly": false,
                        "type_field": "text",
                        "value": "108 mg/dL"
                    },
                    {
                        "name_category": "גלוקוז",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "HbA1c",
                        "readonly": false,
                        "type_field": "text",
                        "value": "8.3%"
                    },
                    {
                        "name_category": "Albumin",
                        "readonly": false,
                        "type_field": "text",
                        "value": "4.1 g/dL"
                    },
                    {
                        "name_category": "PT",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "PTT",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "INR",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "Fibrinogen",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "TSH",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "T3",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "T4",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    }
                ],
                "name_category": "בדיקות דם"
            },
            {
                "name_category": "בדיקות דם אחרות",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "children": [
                    {
                        "name_category": "pH",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "Bicarbonate HCO3",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "pCO2",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "pO2",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "Lactate",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "Base Excess",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "Anion Gap",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    }
                ],
                "name_category": "בדיקות דם רק עבור מטופלים מאושפזים"
            },
            {
                "name_category": "א.ק.ג",
                "readonly": false,
                "type_field": "text",
                "value": "קצב סינוס"
            },
            {
                "name_category": "צילום חזה",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "CT",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "אקו לב",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "מיפוי לב -מבחן מאמץ",
                "readonly": false,
                "type_field": "text",
                "value": "הממצאים מצביעים על איסכמיה בינונית בתפוצה של הRCA לאחר מתן דיפרידמול. הפרפוזיה ליתר דפנות חדר שמאל תקינה ללא עדות לאוטם."
            },
            {
                "name_category": "צנתור לב",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "children": [
                    {
                        "name_category": "%FVC",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "%FEV1",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "FEV1//FVC",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "DLCO",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    },
                    {
                        "name_category": "TLC",
                        "readonly": false,
                        "type_field": "text",
                        "value": ""
                    }
                ],
                "name_category": "תפקודי ריאות"
            },
            {
                "name_category": "דופלר קרוטידים",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "בדיקות עזר נוספות",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "בדיקות מעבדה, הדמיות ובדיקות עזר"
    },
    {
        "children": [
            {
                "name_category": "יעוץ קרדיולוג",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "יעוץ מרפאת קוצבים",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "יעוץ פולמונולוג",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "יעוץ נוירולוג",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "יעוץ מרפאת שבץ",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "יעוץ אחר",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "יועצים"
    },
    {
        "children": [
            {
                "name_category": "גיל",
                "options": [
                    ">=50",
                    "51-80",
                    "<80"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "51-80"
            },
            {
                "name_category": "סטורציה",
                "options": [
                    ">=90%",
                    "91-95",
                    "<96%"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ">=90%"
            },
            {
                "name_category": "זיהום ריאתי בחודש האחרון",
                "options": [
                    "כן",
                    "לא"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "אנמיה טרום ניתוחית",
                "options": [
                    "כן",
                    "לא"
                ],
                "readonly": false,
                "type_field": "text",
                "value": "לא"
            },
            {
                "name_category": "מיקום חתך ניתוחי",
                "options": [
                    "פריפרי",
                    "בטן עליונה",
                    "תורקלי"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "משך ניתוח",
                "options": [
                    "שעתיים ומטה",
                    "שעתיים עד 3",
                    "מעל 3 שעות"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "Ariscat Score"
    },
    {
        "children": [
            {
                "name_category": "אישור לניתוח ",
                "options": [
                    "מאושר",
                    "לא מאושר",
                    "other"
                ],
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "הנחיות רופא מרדים",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "הוראות לתרופות",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "הערות רופא מרדים",
                "readonly": false,
                "type_field": "text",
                "value": ""
            },
            {
                "name_category": "חתימת רופא מרדים",
                "readonly": false,
                "type_field": "text",
                "value": ""
            }
        ],
        "name_category": "סיכום"
    }
]

export const useApp = () => {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = () => {
        setIsUploading(false);
        const fileInput = fileRef.current;
        if (fileInput && fileInput.files) {
            const newFiles = Array.from(fileInput.files);

            setFiles((prevFiles) => {
                const existingFiles = prevFiles.map((file) => `${file.name}-${file.size}`);
                const uniqueFiles = newFiles.filter(
                    (file) => !existingFiles.includes(`${file.name}-${file.size}`)
                );

                const totalFilesCount = prevFiles.length + uniqueFiles.length;

                if (totalFilesCount > 5) {
                    setErrorMessage('You can upload a maximum of 5 files.');
                } else {
                    setErrorMessage('');
                }
                return [...prevFiles, ...uniqueFiles];
            });

        }
    };

    const handleFileRemove = index => {
        const tempFiles = files.filter((_, i) => i !== index);
        const totalFilesCount = tempFiles.length;
        if (totalFilesCount > 5) {
            setErrorMessage('You can upload a maximum of 5 files.');
        } else {
            setErrorMessage('');
        }
        setFiles(tempFiles);
    };

    const handleDataFromFiles = useCallback(async (names) => {
        try {
            return await axios.post("https://yjbsunrt6g.execute-api.us-east-1.amazonaws.com/test", {file_names: names}, {headers: {"Content-Type": "application/json"}});
        } catch (error) {
            console.error("Error get data:", error);
        }
    }, []);

    function wrapJsonIfNeeded(jsonString) {
        const trimmedJson = jsonString.trim();

        if (trimmedJson.startsWith('{') && trimmedJson.endsWith('}')) {
            return `[${trimmedJson}]`;
        }
        return jsonString;
    }

    const handleSendFiles = useCallback(async () => {
        setIsLoading(true);
        try {
            if (files.length === 0) {
                alert("Please select files to upload!");
                return;
            }
            const results = await S3Service.uploadFile(files, FOLDER);
            if (results && results.length > 0) {
                setIsUploading(true);
                console.log("Files uploaded successfully!", results);
                // const fileNames = files.map((file) => `${FOLDER}/${file.name}`);
                // const response = await handleDataFromFiles(fileNames);
                //
                // console.log("Getting response", response)
                // if (
                //     response &&
                //     response.data &&
                //     response.data.response &&
                //     response.data.response.categories &&
                //     response.data.response.categories.length &&
                //     response.data.status === "success")
                // {
                //     const categories = !Array.isArray(response.data.response.categories) ? Object.values(response.data.response.categories) : response.data.response.categories;
                //     await dispatch(updateData(categories));
                //     await dispatch(updateView("details"));
                // }
                await dispatch(updateData(categories));
                await dispatch(updateView("details"));
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, files]);

    console.log('Uploaded files:', files);

    return {
        fileRef,
        files,
        isLoading,
        errorMessage,
        isUploading,
        handleFileChange,
        handleFileRemove,
        handleSendFiles
    };
};
