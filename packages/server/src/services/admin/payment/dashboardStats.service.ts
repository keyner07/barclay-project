import { Between } from "typeorm";
import { Payment } from "../../../db/entity/payment/Payment.entity";
import { SearchInfo } from "../../../db/entity/search/SearchInfo.entity";
import { User } from "../../../db/entity/users/User.entity";

export default async (filter: any) => {

    const response: any = {};
    
    try {

        const payments = await Payment.find({
            where: {
                createdAt: Between(filter.start, filter.end)
            }
        });

        const querys = await SearchInfo.find({
            where: {
                createdAt: Between(filter.start, filter.end)
            }
        })

        const users = await User.find({
            where: {
                createdAt: Between(filter.start, filter.end)
            }
        })

        response.amountPaid = payments.reduce((acc: number, current: Payment) => acc += current.amount, 0)
        response.cantPayments = payments.length;
        response.users = users.length;
        response.querys = querys.length;
        
        return { data: response };

    } catch (error) {
        console.log({ error });

        return { error: { message: "Cannot get dashboard data" } };
    }
}