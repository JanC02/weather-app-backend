// removes diacritics from string
export function removeDiacritics(str: string) {
    const parsed = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/gi, 'l');
    return parsed;
}