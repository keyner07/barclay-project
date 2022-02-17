export const nivelRiesgoFormula = (valor: number) => {
    if (15 <= valor && valor <= 25) {
        return "Muy Grave";
    } else if (9 <= valor) {
        return "Importante";
    } else if (3 <= valor) {
        return "Apreciable";
    } else {
        return "Marginal";
    }
};
