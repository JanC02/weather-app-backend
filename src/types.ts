import z from 'zod';

export const AutocompleteSchema = z.object({
    q: z.preprocess(
        val => (typeof val === 'string' ? val.trim() : val),
        z.string().min(1, { message: 'q is too short' })
    )
});