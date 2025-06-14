import Joi from "joi";

export const lookupSchema = Joi.object({
  plateNumber: Joi.string().required(),
});
