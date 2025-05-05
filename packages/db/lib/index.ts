export const generateSlug = (name: string) => {
    return name
        .toLowerCase()
        .normalize('NFD')
        // biome-ignore lint/suspicious/noMisleadingCharacterClass: 
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/[^\w\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/-+/g, '-'); 
}
