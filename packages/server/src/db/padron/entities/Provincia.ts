import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("provincia", { schema: "admedica_padrondominicano" })
export class Provincia {
  @PrimaryGeneratedColumn({ type: "int", name: "id_prov" })
  idProv: number;

  @Column("varchar", { name: "COD_PROVINCIA", nullable: true, length: 13 })
  codProvincia: string | null;

  @Column("varchar", { name: "DESCRIPCION", nullable: true, length: 22 })
  descripcion: string | null;

  @Column("varchar", { name: "OFICIO", nullable: true, length: 6 })
  oficio: string | null;

  @Column("varchar", { name: "ESTATUS", nullable: true, length: 7 })
  estatus: string | null;

  @Column("varchar", { name: "ZONA", nullable: true, length: 4 })
  zona: string | null;
}
