import { LicenseUser } from "../../db/entity/license/LicenseUsers.entity";



class WatchLicenses {

    leftTime: number;

    constructor(){

        console.log("Start Watching Licenses")
        this.calcLeftTime();
        this.start();
    };

    start() {

        setTimeout(async () => {
            
            try {
                const licensesByUsers = await LicenseUser.find({
                    relations: ["license", "user"],
                    where: {
                        isActive: true
                    }
                });
                
                if(!licensesByUsers.length) console.log("No hay licencias registradas");

                licensesByUsers.forEach(async (LicenseRelation: LicenseUser) => {


                    const currentDate = new Date();

                    const dateLicense = new Date(LicenseRelation.lastPaymentReceived);

                    const leftDays = Math.round((currentDate.getTime() - dateLicense.getTime()) / 1000 / 60 / 60 / 24);

                    const leftTime = LicenseRelation.license.durationDays - leftDays;

                    console.log({leftDays, leftTime, TimeOfLicense: LicenseRelation.license.durationDays})
                    if(leftTime <= 0) {

                        // Desactivar Licencia

                        LicenseRelation.isActive = false;
                        LicenseRelation.fewDaystoFinish = false;

                        try {
                            await LicenseRelation.save();
                            
                            return console.log(`Licencia de usuario ${LicenseRelation.user.email} desactivada`)
                        } catch (error) {
                            return console.log(`Error desactivando licencia de usuario ${LicenseRelation.user.email}`)
                        }

                    } else if(leftTime <= 7){
                        //!TODO: Enviar alerta al cliente de que se le vencera la licencia

                        LicenseRelation.fewDaystoFinish = true;
                        await LicenseRelation.save();
                        
                        return console.log(`La licencia del usuario ${LicenseRelation.user.email} está próxima a vencerse`)
                    }

                    return console.log(`Licencia de usuario ${LicenseRelation.user.email} continua activa`)

                })

            } catch (error) {
                //!TODO: Enviar Notificacion a Hansel de que no se verificaron las licensias****//

                console.log("No se pudo verificar las licensias")
            }

            this.calcLeftTime();

            this.start();

        }, this.leftTime)

    }

    calcLeftTime(){

        const currentDate = new Date();

        const endDay = new Date();
        endDay.setHours(23);
        endDay.setMinutes(59, 59, 999);

       let left = endDay.getTime() - currentDate.getTime();
       console.log({nextCheck: left > 3600000 ? `${Math.round(left / 1000 / 60 / 60)}h left aprox` : (left > 60000 ? `${Math.round(left / 1000 / 60)}m left aprox` : `${Math.round(left / 1000)}s left aprox`), startTime: endDay.toLocaleString(), currentTime: currentDate.toLocaleString()})

       if( left >= 0) return this.leftTime = left;

       currentDate.setDate(currentDate.getDate() + 1);

       console.log({leftTime: currentDate.getTime() - endDay.getTime()})
       this.leftTime = currentDate.getTime() - endDay.getTime();
    }

}

export default new WatchLicenses();