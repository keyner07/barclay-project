import { Payment } from "../../../db/entity/payment/Payment.entity";
import { User } from "../../../db/entity/users/User.entity"

export default async (skip?: number, take?: number) => {

    try {

        let [users, count]  = await User.findAndCount({
            relations: ["searchList", "licensesRelation", "licensesRelation.license", "licensesRelation.payments"],
            take,
            skip
        })

        const finalData = users.map((user: User, i: number) => {
            const licenseActive = user.licensesRelation.find((item) => item.isActive === true);
            const dataFormatted = {
                uuid: user.uuid,
                image: "",
                fullName: `${user.firstName} ${user.lastName}`,
                license: licenseActive?.license?.name || "Sin licencia",
                firstActivation: licenseActive?.createdAt ? new Date(licenseActive?.createdAt).toLocaleDateString() : "",
                paid: licenseActive?.payments ? licenseActive.payments.length : 0,
                totalPaid: licenseActive?.payments ? `RD$${licenseActive.payments.reduce((acc: number, item: Payment) => acc += item.amount, 0)}` : `RD$0`,
                querys: user?.searchList ? user.searchList.length : 0
            }

            return dataFormatted
        });

        return {list: finalData, count};


    } catch (error) {

        console.log({ error });

        return { error: "No fue posible obtener los datos de usuarios" };
    }
}