export default (data: any, ID: string) => {

    ID = ID.trim();

    const dataFixed = data ? data.Sanctions.IDRegDocuments.IDRegDocument : []
    
    return dataFixed.find((e: any) => e.IDRegistrationNo == ID)
}