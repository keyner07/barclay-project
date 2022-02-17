import { Column, Entity, Index } from "typeorm";

@Index("IX_FotosNew", ["secuencia"], {})
@Index("IX_FotosNew_1", ["id"], {})
@Entity("fotos", { schema: "admedica_padrondominicano" })
export class Fotos {
  @Column("char", { primary: true, name: "MUN_CED", length: 3 })
  munCed: string;

  @Column("char", { primary: true, name: "SEQ_CED", length: 7 })
  seqCed: string;

  @Column("char", { primary: true, name: "VER_CED", length: 1 })
  verCed: string;

  @Column("longblob", { name: "IMAGEN", nullable: true })
  imagen: Buffer | null;

  @Column("bigint", { name: "Id", nullable: true })
  id: string | null;

  @Column("bigint", { name: "Secuencia", nullable: true })
  secuencia: string | null;
}
