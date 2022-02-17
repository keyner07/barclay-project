
export default (data: any, fullName: string) => {

    const arrayNames = fullName.split(' ').map(e => e.toLowerCase());

    console.log({data})
    
    const result = data && data.Sanctions.DistinctParties.DistinctParty.filter((e: any) => {

        const data = e.Profile.Identity.Alias.DocumentedName;

        let match = 0;

        if (data && data.DocumentedNamePart && data.DocumentedNamePart[0]){

            data.DocumentedNamePart.forEach((e: any) => {

                if(arrayNames.includes(e.NamePartValue.toLowerCase())) match++;
            })
        }
        
        return match == arrayNames.length;
    });

    return result.length ? true : false
}