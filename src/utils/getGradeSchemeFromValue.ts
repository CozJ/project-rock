import { BTG_GRADES, FONT_GRADES, V_GRADES, YDS_GRADES } from "@/types/types";

const objectContainsValue = (obj: Record<string, string>, value: string) => {
  return Object.values(obj).includes(value);
}

const getGradeSchemeFromValue = (value: string | undefined) => {

    if (value === undefined) return undefined;

    for (const gradeScheme of [BTG_GRADES, FONT_GRADES, V_GRADES, YDS_GRADES]) {
        if (objectContainsValue(gradeScheme, value)) {
            if (gradeScheme === BTG_GRADES) {
                return 'BTG';
            }
            if (gradeScheme === FONT_GRADES) {
                return 'FONT';
            }
            if (gradeScheme === V_GRADES) {
                return 'V';
            }
            if (gradeScheme === YDS_GRADES) {
                return 'YDS';
            }
        }
    }
    return null;
}

export default getGradeSchemeFromValue;