import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("barrio", { schema: "admedica_padrondominicano" })
export class Barrio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "COD_SECTOR", nullable: true, length: 10 })
  codSector: string | null;

  @Column("varchar", { name: "COD_MUNICIPIO", nullable: true, length: 13 })
  codMunicipio: string | null;

  @Column("varchar", { name: "DESCRIPCION", nullable: true, length: 50 })
  descripcion: string | null;

  @Column("varchar", { name: "COD_CIUDAD", nullable: true, length: 10 })
  codCiudad: string | null;
}
