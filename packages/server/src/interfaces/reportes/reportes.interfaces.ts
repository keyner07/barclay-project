import { BooleanType, CurrencyType, DocumentType, Gender, PersonType, PriorityReport } from "./reportes.types";

export interface IROSReport {
    numberReport: string
    numberReport2: string
    generalData: IDatosGenerales
    clientData: IClientData
    financialData: IFinancialData
    internationalTransaction: IInternationalTransactions
    operatorPerson: IOperatorPerson
    beneficiaryData: IOperatorPerson
    reasons: string
    priority?: PriorityReport
    detailsAttachmentDocuments: string
}

export interface IDatosGenerales{
    entity: string
    date: string
    hour: string
    registerCode: string
    stablishmentId: string
}

export interface IClientData {
    personType: PersonType
    pepType?: string
    gender?: Gender
    nameOrCommercialReason: string
    lastNameOrCommercialName?: string
    originNacionality: string
    acquiredNacionality?: string
    documentType: DocumentType
    otherDocument?: string
    documentNumber: string
    specific?: string;
    econimicActivity: string
    productType: string;
    accountNumber: string
    accountNumber2: string
    accountNumber3: string
    province: string
    municipality: string
    sector: string
    address: string
    homePhone: string
    officePhone?: string
    mobilePhone: string
    mobilePhone2?: string
}

export interface IFinancialData {
    transactionType: string
    operationDescription: string
    currencyType: CurrencyType
    specific?: string
    sourceOfFunds: string
    transaccionIsComplete: BooleanType
    reasonNoTransaction: string
    amountOriginalCurrency: number
    amountDominicanPesos: number
    exchangeRate: number
    instrumentType: string
    transactionDate: string
    transactionHour: string
}

export interface IInternationalTransactions{
    sourceCountry?: string
    correspondentEntity?: string
    remitter?: string
    targetCountry?: string
}

export interface IOperatorPerson {
    intermediaryEqualToClient: BooleanType
    gender?: Gender
    name?: string
    lastName?: string
    originNacionalitiy?: string
    acquiredNacionality?: string
    documentType?: DocumentType
    otherDocument?: string
    numberDocument?: string
    specific?: string
    province?: string
    municipality?: string
    sector?: string
    address?: string
}