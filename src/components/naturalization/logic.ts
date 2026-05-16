import type {
  NaturalizationAction,
  NaturalizationAnswers,
  NaturalizationChecklistItem,
  NaturalizationLikelihood,
  NaturalizationResult,
  NaturalizationRisk,
  NaturalizationTypeAssessment,
} from "./types";

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function computeYearsInKorea(entryDate: string): {
  years: number;
  valid: boolean;
} {
  if (!entryDate) {
    return { years: 0, valid: false };
  }

  const timestamp = Date.parse(entryDate);
  if (Number.isNaN(timestamp) || timestamp > Date.now()) {
    return { years: 0, valid: false };
  }

  return { years: (Date.now() - timestamp) / MS_PER_YEAR, valid: true };
}

function evaluateGeneral(
  answers: NaturalizationAnswers,
  yearsInKorea: number,
): NaturalizationLikelihood {
  if (
    answers.continuousResidence === "yes" &&
    yearsInKorea >= 5 &&
    answers.currentVisa === "F-5"
  ) {
    return "green";
  }
  if (yearsInKorea >= 5) {
    return "yellow";
  }
  return "red";
}

function evaluateSimplified(
  answers: NaturalizationAnswers,
  yearsInKorea: number,
): NaturalizationLikelihood {
  const { hasKoreanSpouse, marriageYears } = answers;

  if (hasKoreanSpouse === "yes" && marriageYears >= 2 && yearsInKorea >= 1) {
    return "green";
  }
  if (hasKoreanSpouse === "yes" && marriageYears >= 3) {
    return "green";
  }
  if (hasKoreanSpouse === "yes") {
    return "yellow";
  }
  if (yearsInKorea >= 3) {
    return "yellow";
  }
  return "red";
}

function evaluateSpecial(
  answers: NaturalizationAnswers,
): NaturalizationLikelihood {
  const { hasKoreanParent } = answers;
  if (hasKoreanParent === "yes") return "green";
  if (hasKoreanParent === "unsure") return "yellow";
  return "red";
}

function buildChecklist(
  answers: NaturalizationAnswers,
  yearsInKorea: number,
): NaturalizationChecklistItem[] {
  const items: NaturalizationChecklistItem[] = [
    {
      id: "continuousResidence",
      labelKey: "naturalization.result.checklist.continuousResidence",
      status:
        answers.continuousResidence === "yes"
          ? "met"
          : answers.continuousResidence === "unsure"
            ? "partial"
            : "notMet",
    },
    {
      id: "fiveYears",
      labelKey: "naturalization.result.checklist.fiveYears",
      status:
        yearsInKorea >= 5 ? "met" : yearsInKorea >= 3 ? "partial" : "notMet",
    },
    {
      id: "threeYears",
      labelKey: "naturalization.result.checklist.threeYears",
      status:
        yearsInKorea >= 3 ? "met" : yearsInKorea >= 1 ? "partial" : "notMet",
    },
    {
      id: "f5",
      labelKey: "naturalization.result.checklist.f5",
      status: answers.currentVisa === "F-5" ? "met" : "notMet",
    },
    {
      id: "koreanSpouse",
      labelKey: "naturalization.result.checklist.koreanSpouse",
      status:
        answers.hasKoreanSpouse === "yes"
          ? "met"
          : answers.hasKoreanSpouse === "unsure"
            ? "partial"
            : "notMet",
    },
  ];

  if (answers.hasKoreanSpouse === "yes") {
    items.push({
      id: "marriageDuration",
      labelKey: "naturalization.result.checklist.marriageDuration",
      status:
        answers.marriageYears >= 2
          ? "met"
          : answers.marriageYears >= 1
            ? "partial"
            : "notMet",
    });
  }

  items.push({
    id: "koreanParent",
    labelKey: "naturalization.result.checklist.koreanParent",
    status:
      answers.hasKoreanParent === "yes"
        ? "met"
        : answers.hasKoreanParent === "unsure"
          ? "partial"
          : "notMet",
  });

  items.push({
    id: "adultAge",
    labelKey: "naturalization.result.checklist.adultAge",
    status: answers.age >= 19 ? "met" : "notMet",
  });

  return items;
}

function buildActions(
  answers: NaturalizationAnswers,
  types: NaturalizationTypeAssessment[],
): NaturalizationAction[] {
  const generalGreen = types.some(
    (entry) => entry.id === "general" && entry.likelihood === "green",
  );
  const simplifiedRelevant = answers.hasKoreanSpouse === "yes";
  const specialRelevant =
    answers.hasKoreanParent === "yes" || answers.hasKoreanParent === "unsure";

  const actions: NaturalizationAction[] = [];

  if (!generalGreen && answers.currentVisa !== "F-5") {
    actions.push({
      id: "acquireF5",
      titleKey: "naturalization.result.actions.acquireF5",
      descriptionKey: "naturalization.result.actions.acquireF5Description",
    });
  }

  actions.push({
    id: "completeKiip",
    titleKey: "naturalization.result.actions.completeKiip",
    descriptionKey: "naturalization.result.actions.completeKiipDescription",
  });

  if (simplifiedRelevant) {
    actions.push({
      id: "gatherSpouseDocs",
      titleKey: "naturalization.result.actions.gatherSpouseDocs",
      descriptionKey: "naturalization.result.actions.gatherSpouseDocsDescription",
    });
  }

  if (specialRelevant) {
    actions.push({
      id: "gatherFamilyRegistry",
      titleKey: "naturalization.result.actions.gatherFamilyRegistry",
      descriptionKey:
        "naturalization.result.actions.gatherFamilyRegistryDescription",
    });
  }

  actions.push({
    id: "submitApplication",
    titleKey: "naturalization.result.actions.submitApplication",
    descriptionKey:
      "naturalization.result.actions.submitApplicationDescription",
  });
  actions.push({
    id: "prepareInterview",
    titleKey: "naturalization.result.actions.prepareInterview",
    descriptionKey: "naturalization.result.actions.prepareInterviewDescription",
  });

  return actions;
}

function buildRisks(answers: NaturalizationAnswers): NaturalizationRisk[] {
  const risks: NaturalizationRisk[] = [
    {
      id: "absences",
      titleKey: "naturalization.result.risks.absences.title",
      descriptionKey: "naturalization.result.risks.absences.description",
    },
    {
      id: "taxArrears",
      titleKey: "naturalization.result.risks.taxArrears.title",
      descriptionKey: "naturalization.result.risks.taxArrears.description",
    },
  ];

  if (answers.hasKoreanSpouse === "yes") {
    risks.push({
      id: "marriageAuthenticity",
      titleKey: "naturalization.result.risks.marriageAuthenticity.title",
      descriptionKey:
        "naturalization.result.risks.marriageAuthenticity.description",
    });
  }

  return risks;
}

export function evaluateNaturalization(
  answers: NaturalizationAnswers,
): NaturalizationResult {
  const { years, valid } = computeYearsInKorea(answers.entryDate);

  const types: NaturalizationTypeAssessment[] = [
    { id: "general", likelihood: evaluateGeneral(answers, years) },
    { id: "simplified", likelihood: evaluateSimplified(answers, years) },
    { id: "special", likelihood: evaluateSpecial(answers) },
  ];

  return {
    yearsInKorea: years,
    entryDateValid: valid,
    types,
    checklist: buildChecklist(answers, years),
    actions: buildActions(answers, types),
    risks: buildRisks(answers),
  };
}
