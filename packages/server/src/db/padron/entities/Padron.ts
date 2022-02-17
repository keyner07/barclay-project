import { BaseEntity, Column, Entity, Index } from "typeorm";

@Index("CedulaV", ["cedANum", "cedASeri"], {})
@Index("Nombres", ["nombres", "apellido1", "apellido2"], {})
@Index("Pasaporte", ["numPasapo"], {})
@Index("index_n", ["nombres"], {})
@Entity("padron", { schema: "admedica_padrondominicano" })
export class Padron extends BaseEntity {
  @Column("varchar", { primary: true, name: "MUN_CED", length: 3 })
  munCed: string;

  @Column("varchar", { primary: true, name: "SEQ_CED", length: 7 })
  seqCed: string;

  @Column("varchar", { primary: true, name: "VER_CED", length: 1 })
  verCed: string;

  @Column("varchar", { name: "NOMBRES", nullable: true, length: 30 })
  nombres: string | null;

  @Column("varchar", { name: "APELLIDO1", nullable: true, length: 30 })
  apellido1: string | null;

  @Column("varchar", { name: "APELLIDO2", nullable: true, length: 30 })
  apellido2: string | null;

  @Column("datetime", { name: "FECHA_NAC", nullable: true })
  fechaNac: Date | null;

  @Column("varchar", { name: "LUGAR_NAC", nullable: true, length: 30 })
  lugarNac: string | null;

  @Column("varchar", { name: "CED_A_NUM", nullable: true, length: 6 })
  cedANum: string | null;

  @Column("varchar", { name: "CED_A_SERI", nullable: true, length: 3 })
  cedASeri: string | null;

  @Column("varchar", { name: "CED_A_SEXO", nullable: true, length: 1 })
  cedASexo: string | null;

  @Column("varchar", { name: "CALLE", nullable: true, length: 25 })
  calle: string | null;

  @Column("varchar", { name: "CASA", nullable: true, length: 5 })
  casa: string | null;

  @Column("varchar", { name: "EDIFICIO", nullable: true, length: 25 })
  edificio: string | null;

  @Column("varchar", { name: "PISO", nullable: true, length: 2 })
  piso: string | null;

  @Column("varchar", { name: "APTO", nullable: true, length: 5 })
  apto: string | null;

  @Column("varchar", { name: "TELEFONO", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "COD_MUNICIPIO", nullable: true, length: 3 })
  codMunicipio: string | null;

  @Column("varchar", { name: "COD_CIUDAD", nullable: true, length: 2 })
  codCiudad: string | null;

  @Column("varchar", { name: "COD_SECTOR", nullable: true, length: 4 })
  codSector: string | null;

  @Column("smallint", { name: "COD_PIEL", nullable: true })
  codPiel: number | null;

  @Column("smallint", { name: "COD_SANGRE", nullable: true })
  codSangre: number | null;

  @Column("varchar", { name: "SEXO", nullable: true, length: 1 })
  sexo: string | null;

  @Column("varchar", { name: "SENAS_PART", nullable: true, length: 25 })
  senasPart: string | null;

  @Column("smallint", { name: "COD_PROF", nullable: true })
  codProf: number | null;

  @Column("smallint", { name: "COD_OCUP", nullable: true })
  codOcup: number | null;

  @Column("smallint", { name: "COD_NACION", nullable: true })
  codNacion: number | null;

  @Column("varchar", { name: "EST_CIVIL", nullable: true, length: 1 })
  estCivil: string | null;

  @Column("varchar", { name: "NPADRE", nullable: true, length: 40 })
  npadre: string | null;

  @Column("varchar", { name: "NMADRE", nullable: true, length: 40 })
  nmadre: string | null;

  @Column("varchar", { name: "NCONYUGUE", nullable: true, length: 40 })
  nconyugue: string | null;

  @Column("varchar", { name: "CEDULA_PADRE", nullable: true, length: 13 })
  cedulaPadre: string | null;

  @Column("varchar", { name: "CEDULA_MADRE", nullable: true, length: 13 })
  cedulaMadre: string | null;

  @Column("varchar", { name: "CEDULA_CONYUGUE", nullable: true, length: 13 })
  cedulaConyugue: string | null;

  @Column("varchar", { name: "NUM_PASAPO", nullable: true, length: 12 })
  numPasapo: string | null;

  @Column("varchar", { name: "NUM_RESIDE", nullable: true, length: 12 })
  numReside: string | null;

  @Column("datetime", { name: "FECHA_EXPE", nullable: true })
  fechaExpe: Date | null;

  @Column("datetime", { name: "FECHA_NATU", nullable: true })
  fechaNatu: Date | null;

  @Column("datetime", { name: "FECHA_EXPIRACION", nullable: true })
  fechaExpiracion: Date | null;

  @Column("varchar", { name: "CATEGORIA", nullable: true, length: 1 })
  categoria: string | null;

  @Column("varchar", { name: "TIPO_CAUSA", nullable: true, length: 2 })
  tipoCausa: string | null;

  @Column("smallint", { name: "COD_CAUSA", nullable: true })
  codCausa: number | null;

  @Column("varchar", { name: "SOLICITUD", nullable: true, length: 14 })
  solicitud: string | null;

  @Column("varchar", { name: "TIPO_ACTA", nullable: true, length: 1 })
  tipoActa: string | null;

  @Column("varchar", { name: "ACTA_MUN", nullable: true, length: 3 })
  actaMun: string | null;

  @Column("varchar", { name: "ACTA_OFIC", nullable: true, length: 2 })
  actaOfic: string | null;

  @Column("varchar", { name: "ACTA_LIBRO", nullable: true, length: 4 })
  actaLibro: string | null;

  @Column("varchar", { name: "ACTA_FOLIO", nullable: true, length: 3 })
  actaFolio: string | null;

  @Column("varchar", { name: "ACTA_NUMERO", nullable: true, length: 5 })
  actaNumero: string | null;

  @Column("varchar", { name: "ACTA_ANO", nullable: true, length: 4 })
  actaAno: string | null;

  @Column("varchar", { name: "TIPO_LIBRO", nullable: true, length: 1 })
  tipoLibro: string | null;

  @Column("varchar", { name: "ACTA_AUTOMATIZADA", nullable: true, length: 50 })
  actaAutomatizada: string | null;

  @Column("varchar", { name: "ESTATUS", nullable: true, length: 1 })
  estatus: string | null;

  @Column("datetime", { name: "FECHA_CAPT", nullable: true })
  fechaCapt: Date | null;

  @Column("datetime", { name: "FECHA_DECLA", nullable: true })
  fechaDecla: Date | null;

  @Column("datetime", { name: "FECHA_CANCELACION", nullable: true })
  fechaCancelacion: Date | null;

  @Column("mediumint", { name: "NUMERO_OFICIO", nullable: true })
  numeroOficio: number | null;

  @Column("datetime", { name: "FECHA_REVALIDACION", nullable: true })
  fechaRevalidacion: Date | null;

  @Column("mediumint", { name: "NUMERO_OFICIO_REVALIDACION", nullable: true })
  numeroOficioRevalidacion: number | null;

  @Column("varchar", { name: "PADRE_NOMBRES", nullable: true, length: 30 })
  padreNombres: string | null;

  @Column("varchar", { name: "PADRE_APELLIDO1", nullable: true, length: 30 })
  padreApellido1: string | null;

  @Column("varchar", { name: "PADRE_APELLIDO2", nullable: true, length: 30 })
  padreApellido2: string | null;

  @Column("varchar", { name: "MADRE_NOMBRES", nullable: true, length: 30 })
  madreNombres: string | null;

  @Column("varchar", { name: "MADRE_APELLIDO1", nullable: true, length: 30 })
  madreApellido1: string | null;

  @Column("varchar", { name: "MADRE_APELLIDO2", nullable: true, length: 30 })
  madreApellido2: string | null;

  @Column("varchar", { name: "CONYUGUE_NOMBRES", nullable: true, length: 30 })
  conyugueNombres: string | null;

  @Column("varchar", { name: "CONYUGUE_APELLIDO1", nullable: true, length: 30 })
  conyugueApellido1: string | null;

  @Column("varchar", { name: "CONYUGUE_APELLIDO2", nullable: true, length: 30 })
  conyugueApellido2: string | null;

  @Column("char", { name: "DONANTE", nullable: true, length: 1 })
  donante: string | null;
}
