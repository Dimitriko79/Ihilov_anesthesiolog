export const checkEnglishWords = word => {
    const englishPattern = /[A-Za-z]+(?:[-'][A-Za-z]+)*/g;
    return (word.match(englishPattern) || []).length > 0
}