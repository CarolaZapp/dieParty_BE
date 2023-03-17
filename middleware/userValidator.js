import { body } from "express-validator";

export const userValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Vorname muss angegeben werden")
    .isAlpha("de-DE", { ignore: " -" }) //  mit Leerzeichen oder Bindestrich
    .withMessage("Vorname enthält unzulässige Zeichen")
    .trim()
    .escape(),

  body("lastName")
    .notEmpty()
    .withMessage("Nachname muss angegeben werden")
    .isAlpha("de-DE", { ignore: " -" })
    .withMessage("Nachname enthält unzulässige Zeichen")
    .trim()
    .isLength({ min: 2 })
    .escape(),

  body("email")
    .notEmpty()
    .withMessage("Email muss angegeben werden")
    .trim()
    .isEmail()
    .withMessage("Email-Format ist ungültig")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Passwort muss angegeben werden")
    .trim()
    .isStrongPassword()
    .withMessage(
      "    'Passwort ist nicht sicher. Es soll mindestens acht Zeichen enthalten, davon mindestens eine Kleinbuchstabe, mindestens eine Großbuchstabe, mindestens eine Nummer und mindestens ein Sonderzeichen.'"
    )
    .isLength({ min: 8 }),
];

// erweitern!!!!

export const userUpdateValidator = [
  body("firstName")
    .optional()
    .isAlpha("de-DE", { ignore: " -" })
    .withMessage("Vorname enthält unzulässige Zeichen")
    .trim(),
];
