import type { VisaSubtype, YesNoUnsure } from "@/lib/data";
import type { TranslationKey } from "@/lib/i18n";

export type NaturalizationParent = "father" | "mother" | "both";

export type NaturalizationAnswers = {
  nationality: string;
  age: number;
  currentVisa: VisaSubtype;
  entryDate: string;
  continuousResidence: YesNoUnsure;
  hasKoreanSpouse: YesNoUnsure;
  marriageYears: number;
  hasKoreanParent: YesNoUnsure;
  whichParent: NaturalizationParent;
};

export type NaturalizationLikelihood = "green" | "yellow" | "red";

export type NaturalizationTypeId = "general" | "simplified" | "special";

export type NaturalizationTypeAssessment = {
  id: NaturalizationTypeId;
  likelihood: NaturalizationLikelihood;
};

export type NaturalizationChecklistStatus = "met" | "partial" | "notMet";

export type NaturalizationChecklistItemId =
  | "continuousResidence"
  | "fiveYears"
  | "threeYears"
  | "f5"
  | "koreanSpouse"
  | "marriageDuration"
  | "koreanParent"
  | "adultAge";

export type NaturalizationChecklistItem = {
  id: NaturalizationChecklistItemId;
  status: NaturalizationChecklistStatus;
  labelKey: TranslationKey;
};

export type NaturalizationActionId =
  | "acquireF5"
  | "completeKiip"
  | "gatherSpouseDocs"
  | "gatherFamilyRegistry"
  | "submitApplication"
  | "prepareInterview";

export type NaturalizationAction = {
  id: NaturalizationActionId;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

export type NaturalizationRiskId =
  | "absences"
  | "taxArrears"
  | "marriageAuthenticity";

export type NaturalizationRisk = {
  id: NaturalizationRiskId;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
};

export type NaturalizationResult = {
  yearsInKorea: number;
  entryDateValid: boolean;
  types: NaturalizationTypeAssessment[];
  checklist: NaturalizationChecklistItem[];
  actions: NaturalizationAction[];
  risks: NaturalizationRisk[];
};
