import { Matriz } from "../../../db/entity/matriz/matriz.entity";

export default async (id: number) => {
    try {
        const data = await Matriz.findOne({
            where: {
                matrixIsActive: true,
            },
        });

        return { data };
    } catch (error) {
        console.log({ error });
        return { error: "Cannot get default Risk Matrix" };
    }
};
