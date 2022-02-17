export const blackList = [
    "República Popular Democrática de Corea" ,
    "Irán",
]

export const grayList = [
    "Albania",
    "Barbados",
    "Botsuana",
    "Burkina Faso",
    "Camboya",
    "Islas Caimáan",
    "Ghana",
    "Jamaica",
    "Mauricio",
    "Marruecos",
    "Myanmar",
    "Nicaragua",
    "Pakistán",
    "Panamá",
    "Senegal",
    "Siria",
    "Uganda",
    "Yemen",
    "Zimbabue",
]

export const checkNacionality = (country: string) => {
    return blackList.includes(country) || grayList.includes(country);
}
