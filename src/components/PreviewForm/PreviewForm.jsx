import classes from "./previewForm.module.scss";
import { usePreviewForm } from "./usePreviewForm.js";
import PreviewHeader from "./PreviewHeader/PreviewHeader.jsx";
import PreviewFooter from "./PreviewFooter/PreviewFooter.jsx";
import PatientDetails from "./PreviewMain/PatientDetails.jsx";
import Measurements from "./PreviewMain/Measurements.jsx";
import VisitData from "./PreviewMain/VisitData.jsx";
import ApprovedForSurgery from "./PreviewMain/ApprovedForSurgery.jsx";
import Habits from "./PreviewMain/Habits.jsx";
import AllergiesAndSensitivities from "./PreviewMain/AllergiesAndSensitivities.jsx";
import BackgroundDiagnoses from "./PreviewMain/BackgroundDiagnoses.jsx";
import MedicalBackground from "./PreviewMain/MedicalBackground.jsx";
import PastSurgeries from "./PreviewMain/PastSurgeries.jsx";
import AnestheticHistory from "./PreviewMain/AnestheticHistory.jsx";
import ASA from "./PreviewMain/ASA.jsx";
import FrailScale from "./PreviewMain/FrailScale.jsx";
import RCRI from "./PreviewMain/RCRI.jsx";
import StopBang from "./PreviewMain/StopBang.jsx";
import ClinicalFrailtyScale from "./PreviewMain/ClinicalFrailtyScale.jsx";
import MiniCOG from "./PreviewMain/MiniCOG.jsx";
import FunctionalCapacity from "./PreviewMain/FunctionalCapacity.jsx";
import PhysicalExamination from "./PreviewMain/PhysicalExamination.jsx";
import LaboratoryTestsImagingAndAuxiliaryTests from "./PreviewMain/LaboratoryTestsImagingAndAuxiliaryTests.jsx";
import Consultants from "./PreviewMain/Consultants.jsx";
import AriscatScore from "./PreviewMain/AriscatScore.jsx";
import Summary from "./PreviewMain/Summary.jsx";
import SurgeryDetails from "./PreviewMain/SurgeryDetails.jsx";
import RegularMedicationTreatment from "./PreviewMain/RegularMedicationTreatment.jsx";

const PreviewForm = () => {
    const {categoryData} = usePreviewForm();

    const {
        patientDetails,
        visitData,
        approvedForSurgery,
        surgeryDetails,
        habits,
        allergiesAndSensitivities,
        backgroundDiagnoses,
        medicalBackground,
        pastSurgeries,
        regularMedicationTreatment,
        anestheticHistory,
        asa,
        frailScale,
        rcri,
        measurements,
        stopBang,
        clinicalFrailtyScale,
        miniCog,
        functionalCapacity,
        osa,
        timedUpAndGoTest,
        frailScaleAssessmentScores,
        physicalExamination,
        laboratoryTestsImagingAndAuxiliaryTests,
        consultants,
        ariscatScore,
        summary
    } = categoryData;

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/*<div className={classes.preview_header_for_print}>*/}
            {/*    <p>סודי רפואי</p>*/}
            {/*    <table border={1}>*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            <td>{first_name}</td>*/}
            {/*            <td>{family_name}</td>*/}
            {/*            <td>{visit_number}</td>*/}
            {/*            <td>תאריך: {date}</td>*/}
            {/*            <td>{unit_name}</td>*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <div id="preview"  className={classes.preview}>
                <PreviewHeader nowDate={new Date()}/>
                <main className={classes.preview_main}>
                    <h1>סיכום ביקור רופא מרדים</h1>
                    <PatientDetails patient={patientDetails} classes={classes}/>
                    <VisitData visit={visitData} classes={classes}/>
                    <ApprovedForSurgery data={approvedForSurgery} classes={classes}/>
                    <SurgeryDetails data={surgeryDetails} classes={classes}/>
                    <Habits habits={habits} classes={classes}/>
                    <AllergiesAndSensitivities data={allergiesAndSensitivities} classes={classes}/>
                    <BackgroundDiagnoses data={backgroundDiagnoses} classes={classes}/>
                    <MedicalBackground data={medicalBackground} classes={classes}/>
                    <PastSurgeries data={pastSurgeries} classes={classes}/>
                    <RegularMedicationTreatment data={regularMedicationTreatment} classes={classes}/>
                    <AnestheticHistory data={anestheticHistory} classes={classes}/>
                    <ASA data={asa} classes={classes}/>
                    <FrailScale data={frailScale} classes={classes}/>
                    <RCRI data={rcri} classes={classes} />
                    <Measurements measurements={measurements} classes={classes}/>
                    <StopBang data={stopBang} classes={classes}/>
                    <ClinicalFrailtyScale data={clinicalFrailtyScale} classes={classes} />
                    <MiniCOG data={miniCog} classes={classes}/>
                    <FunctionalCapacity data={functionalCapacity} classes={classes}/>
                    <PhysicalExamination data={physicalExamination} classes={classes} />
                    <LaboratoryTestsImagingAndAuxiliaryTests data={laboratoryTestsImagingAndAuxiliaryTests} classes={classes} />
                    <Consultants data={consultants} classes={classes}/>
                    <AriscatScore data={ariscatScore} classes={classes}/>
                    <Summary data={summary} classes={classes}/>
                    {/*<div className={`${classes.preview_main_planned_surgeries}`}>*/}
                    {/*    <p><strong>ניתוחים מתוכננים</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>EUS</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <strong>ASA</strong>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>ASA score: 3</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_instructions_and_indicators}`}>*/}
                    {/*    <p><strong>הוראות ומדדים</strong></p>*/}
                    {/*    <table>*/}
                    {/*        <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th><span>תאריך</span></th>*/}
                    {/*            <th><span>שעה</span></th>*/}
                    {/*            <th><span>קטגוריה</span></th>*/}
                    {/*            <th><span>מדד</span></th>*/}
                    {/*            <th><span>תוצאות והערות</span></th>*/}
                    {/*        </tr>*/}
                    {/*        </thead>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>04/12/2024</span></td>*/}
                    {/*            <td><span>08:40</span></td>*/}
                    {/*            <td><span>מדדים</span></td>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>לחץ דם</span></td>*/}
                    {/*            <td><span>154/74</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>דופק</span></td>*/}
                    {/*            <td><span>78</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>סטורציה</span></td>*/}
                    {/*            <td><span>93</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>משקל</span></td>*/}
                    {/*            <td><span>40</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>גובה</span></td>*/}
                    {/*            <td><span>158</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>BMI</span></td>*/}
                    {/*            <td><span>16</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>10/09/2024</span></td>*/}
                    {/*            <td><span>10:14</span></td>*/}
                    {/*            <td><span>מדדים</span></td>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>לחץ דם</span></td>*/}
                    {/*            <td><span>154/74</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>דופק</span></td>*/}
                    {/*            <td><span>78</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>10/09/2024</span></td>*/}
                    {/*            <td><span>10:05</span></td>*/}
                    {/*            <td><span>מדדים</span></td>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>משקל</span></td>*/}
                    {/*            <td><span>37</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>07/08/2024</span></td>*/}
                    {/*            <td><span>10:02</span></td>*/}
                    {/*            <td><span>מדדים</span></td>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>לחץ דם</span></td>*/}
                    {/*            <td><span>144/52</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>דופק</span></td>*/}
                    {/*            <td><span>52</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>07/08/2024</span></td>*/}
                    {/*            <td><span>09:54</span></td>*/}
                    {/*            <td><span>מדדים</span></td>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td/>*/}
                    {/*            <td><span>משקל</span></td>*/}
                    {/*            <td><span>36.5</span></td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_drug_sensitivity}`}>*/}
                    {/*    <p><strong>הוראות ומדדים</strong></p>*/}
                    {/*    <table>*/}
                    {/*        <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th><span>שם התרופה</span></th>*/}
                    {/*            <th><span>תאריך רישום</span></th>*/}
                    {/*        </tr>*/}
                    {/*        </thead>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>PENICILLIN</span></td>*/}
                    {/*            <td><span>17/07/2024</span></td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_past_history}`}>*/}
                    {/*    <p><strong>תולדות עבר</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>S/P VENTRICULT SEPTAL DEFFECT</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>PULMONARY FIBROSIS ./stop procor</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_obstructive_sleep_apnea}`}>*/}
                    {/*    <p><strong>Obstructive Sleep Apnea</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>OSA LowRisk: 0-2</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>Intermediate Risk: 3-4</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>High Risk: 5-8</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_anesthesia_history}`}>*/}
                    {/*    <p><strong>היסטוריה הרדמתית</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>בעיות ידועיות בהרדמה: {"לא"}</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_regular_medications}`}>*/}
                    {/*    <p><strong>תרופות קבועות</strong></p>*/}
                    {/*    <table>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <div>*/}
                    {/*                    <span>DONEPEZIL-TEVA TAB 10 mg P.O</span>*/}
                    {/*                </div>*/}
                    {/*                <div>*/}
                    {/*                    <span>כדור אחד בערב</span>*/}
                    {/*                </div>*/}
                    {/*            </td>*/}
                    {/*            <td><span>10 mg</span></td>*/}
                    {/*            <td><span>1 X 1 ביום</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <div>*/}
                    {/*                    <span>ELTROXIN TAB 100 mcg P.O</span>*/}
                    {/*                </div>*/}
                    {/*            </td>*/}
                    {/*            <td><span>100 mcg</span></td>*/}
                    {/*            <td><span>1 X 5 בשבוע</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <div>*/}
                    {/*                    <span>LITORVA TAB 10 mg P.O</span>*/}
                    {/*                </div>*/}
                    {/*                <div>*/}
                    {/*                    <span>כדור אחד בערב</span>*/}
                    {/*                </div>*/}
                    {/*            </td>*/}
                    {/*            <td><span>10 mg</span></td>*/}
                    {/*            <td><span>1 X 1 ביום</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <div>*/}
                    {/*                    <span>MEMANTINE HCL TAB 10 mg P.O</span>*/}
                    {/*                </div>*/}
                    {/*                <div>*/}
                    {/*                    <span>כדור אחד בערב</span>*/}
                    {/*                </div>*/}
                    {/*            </td>*/}
                    {/*            <td><span>10 mg</span></td>*/}
                    {/*            <td><span>1 X 1 ביום</span></td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <div>*/}
                    {/*                    <span>RIVAROXABAN</span>*/}
                    {/*                </div>*/}
                    {/*                <div>*/}
                    {/*                    <span>כדור אחד בערב</span>*/}
                    {/*                </div>*/}
                    {/*            </td>*/}
                    {/*            <td><span>15</span></td>*/}
                    {/*            <td><span>1 X 1 ביום</span></td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_functional_capacity}`}>*/}
                    {/*    <p><strong>Functional Capacity</strong></p>*/}
                    {/*    <table>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <ul>*/}
                    {/*                    <li>*/}
                    {/*                        <span>09:38 04/12/2024</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>נרשם ע״י דר׳ יעקובלב ילנה מ.ר.37054</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>MET: &gt; 4</span>*/}
                    {/*                    </li>*/}
                    {/*                </ul>*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_mini_cog}`}>*/}
                    {/*    <p><strong>MINI COG</strong></p>*/}
                    {/*    <table>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td>*/}
                    {/*                <ul>*/}
                    {/*                    <li>*/}
                    {/*                        <span>09:38 04/12/2024</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>נרשם ע״י דר׳ יעקובלב ילנה מ.ר.37054</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>MINI COG: לא נדרש</span>*/}
                    {/*                    </li>*/}
                    {/*                </ul>*/}
                    {/*            </td>*/}
                    {/*            <td>*/}
                    {/*                <ul>*/}
                    {/*                    <li>*/}
                    {/*                        <span>08:43 04/12/2024</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>נרשם ע״י דר׳ בר טל מ.ר.116192</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>MINI COG: בוצע</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>זכרון 3 חפצים: 0</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>שעון: 0</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>סך הכל: 0</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>0-2 = חשד לדמנציה</span>*/}
                    {/*                    </li>*/}
                    {/*                    <li>*/}
                    {/*                        <span>5-3 = ללא חשד לדמנציה</span>*/}
                    {/*                    </li>*/}
                    {/*                </ul>*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_timed_up_and_go_test}`}>*/}
                    {/*    <p>*/}
                    {/*        <strong>Timed Up And Go Test</strong>*/}
                    {/*    </p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>תזמון הפעולה: שניות 14</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*    <span>*/}
                    {/*    <strong>אם התזמון מעל 12 שניות HIGH RISK לנפילה</strong>*/}
                    {/*</span>*/}
                    {/*    <div>*/}
                    {/*    <span>*/}
                    {/*        <strong>FRAIL SCALE</strong>*/}
                    {/*    </span>*/}
                    {/*        <table>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>מועד עדכון:</span></th>*/}
                    {/*                <td><span>09:38 04/12/2024</span></td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>Rockwood Clinical Frailty Scale 1-9</span></th>*/}
                    {/*                <td><span> Mildly Frail - 5 - נעזר בהליכון ו/או זקוק לעזרה בפעילות מחוץ לבית</span>*/}
                    {/*                </td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>מעל 5 מחלות רקע</span></th>*/}
                    {/*                <td><span>כן</span></td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>תפקוד - חוסר יכולת ללכת מעל 300 מטר ללא עזרים או מנוחה</span></th>*/}
                    {/*                <td><span>כן</span></td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>ירידה לא מכוונת במשקל מעל 5 ק״ג בשנה</span></th>*/}
                    {/*                <td><span>כן</span></td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>גרם מדקגות - אי יכולת לעלות קומה מדרגות ללא עזרים או מנוחה</span></th>*/}
                    {/*                <td><span>כן</span></td>*/}
                    {/*            </tr>*/}
                    {/*            <tr>*/}
                    {/*                <th><span>עייפות ברב שעות היום בחודש האחרון</span></th>*/}
                    {/*                <td><span>כן</span></td>*/}
                    {/*            </tr>*/}
                    {/*        </table>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_estimated_scores}`}>*/}
                    {/*    <p><strong>ציוני אומדנים - FRAIL SCALE</strong></p>*/}
                    {/*    <span>אומדן אחרון</span>*/}
                    {/*    <table>*/}
                    {/*        <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th><span>אומדן</span></th>*/}
                    {/*            <th><span>עודכן ע״י + תאריך</span></th>*/}
                    {/*            <th><span>ציון</span></th>*/}
                    {/*            <th><span>משמעות</span></th>*/}
                    {/*        </tr>*/}
                    {/*        </thead>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td><span>FRAIL SCALE</span></td>*/}
                    {/*            <td>*/}
                    {/*                <span>דר׳ יעקובלב ילנה מ.ר.37054</span>*/}
                    {/*                <span>08:43 04/12/2024</span>*/}
                    {/*            </td>*/}
                    {/*            <td><span>5</span></td>*/}
                    {/*            <td><span>שברירי</span></td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_upper_airway_assessment}`}>*/}
                    {/*    <p><strong>הערכת דרכי אוויר עליונור</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>{"3"} :MALLAMPATI</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>שיניים: {"כתרים ושתלים קבועים"}</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_preoperative_laboratory_tests}`}>*/}
                    {/*    <p><strong>בדיקות מעבדה טרום ניטוח</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span>ביוכימיה UREA: </span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>ספירת דם HB: </span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>מנגנון קרישה INR: </span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span>אנדוקרינולוגיה TSH: </span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes.preview_main_additional_auxiliary_tests}`}>*/}
                    {/*    <p><strong>בדיקות מעבדה טרום ניטוח</strong></p>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>א.ק.ג.: </strong>AF54</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>ספירת דם: </strong>הצילום מוגבל מבחינה טכנית לא הודגם תסנין, תפליט או גודש ראתי </span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>אקו לב: </strong>2019Normal LV size. Normal LV walls thickness. Mild global systolic LV dysfunction (EF 45-50%). Grade 2 diastolic</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>מיפוי לב: </strong>2019Failure to achive target heart rate9</span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>מבחן מאמץ: </strong></span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>צינטור לב: </strong></span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>תפקודי ריאה: </strong></span>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <span><strong>דופלר קרוטידים: </strong>בדיקת דופלקס עורקי צואר תקינה</span>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    <div className={`${classes.preview_main_pre_operative_anesthesiologist_appointments}`}>
                        <p><strong>אוראות רופא מרדים טרום ניתוח</strong></p>
                        <ul>
                            <li>
                                <span>צום 6 שעות מזון צום 2 שעות מים</span>
                            </li>
                            <li>
                                <span>צוות מטפל - נא להקפיד על רישום תרופות קבועות למטופל</span>
                            </li>
                        </ul>
                    </div>
                    <div className={`${classes.preview_main_anesthesiologist_signature}`}>
                        <p><strong>חתימה רופא מרדים</strong></p>
                        <table>
                            <thead>
                            <tr>
                                <th><span>זמן חתימה</span></th>
                                <th><span>תפקיד</span></th>
                                <th><span>שם החותם</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td/>
                            </tr>
                            <tr>
                                <td/>
                            </tr>
                            <tr>
                                <td/>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
                <PreviewFooter onPrint={handlePrint}/>
            </div>
        </>
    )
}
export default PreviewForm;