import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("municipio", { schema: "admedica_padrondominicano" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "id_mun" })
  idMun: number;

  @Column("varchar", { name: "COD_MUNICIPIO", nullable: true, length: 13 })
  codMunicipio: string | null;

  @Column("varchar", { name: "DESCRIPCION", nullable: true, length: 35 })
  descripcion: string | null;

  @Column("varchar", { name: "COD_PROVINCIA", nullable: true, length: 13 })
  codProvincia: string | null;

  @Column("varchar", {
    name: "COD_MUNICIPIO_PADRE",
    nullable: true,
    length: 19,
  })
  codMunicipioPadre: string | null;
}
