import z from 'zod';

export const AutocompleteSchema = z.object({
    q: z.preprocess(
        val => (typeof val === 'string' ? val.trim() : val),
        z.string().min(1, { message: 'q is too short' })
    )
});

export const CurrentSchema = z.object({
    lat: z.coerce.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
    lon: z.coerce.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
});