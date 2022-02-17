import { getConnection, Repository } from "typeorm";
import { Fotos } from "../db/padron/entities/Fotos";
import { Padron } from "../db/padron/entities/Padron";

export const padron = (): Repository<Padron> => getConnection("padron").getRepository(Padron);
export const fotosPadron = (): Repository<Fotos> => getConnection("padron").getRepository(Fotos);
///Mandame la captura par amandarselos de los reportes bien