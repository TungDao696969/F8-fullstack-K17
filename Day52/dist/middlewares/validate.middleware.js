"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const zodErrors = Object.fromEntries(error.issues.map(({ path, message }) => {
                return [path[0], message];
            }));
            return res.status(400).json({
                errors: zodErrors,
            });
        }
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map