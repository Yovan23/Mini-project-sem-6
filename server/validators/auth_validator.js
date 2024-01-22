const { z } = require("zod");

const singupSchema = z.object({
    username: z
    .string({required_error:"Username is required"})
    .trim()
    .min(5, {msg: "Username at lest 5 chars. "})
    .max(10, {msg: "Username not more than 10 chars."}),
    password: z
    .string({required_error:"Password is required"})
    .min(5, {msg: "Password at lest 5 chars. "})
    .max(10, {msg: "Password not more than 10 chars."}),
});


module.exports = singupSchema;