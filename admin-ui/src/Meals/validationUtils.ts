interface Meal {
  code: number;
  nameEn: string;
  nameFr: string
  descriptionEn: string;
  descriptionFr: string;

}

export const validateMealCreation = (values: Meal): { [key: string]: string } => {
      const errors: {[key: string]: string} = {};
      if (!values.nameEn) {
            errors.nameEn = "The name in English is required";
      }
      if (!values.code) {
            errors.code = "The code is required";
      }
      if (!values.nameFr) {
            errors.nameFr = "The name in French is required";
      }
      if (!values.descriptionEn) {
            errors.descriptionEn = "The description in English is required";
      }
      if (!values.descriptionFr) {
            errors.descriptionFr = "The description in French is required";
      }

      return errors;
};
