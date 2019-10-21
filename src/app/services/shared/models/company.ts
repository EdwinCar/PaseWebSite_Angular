import { ServiceCustomer } from './service-customer';

export class Company {
  codigoEmpresa: string;
  ruc: string;
  razonSocial: string;
  telefono: string;
  razonComercial: string;
  fax: string;
  direccion: string;
  emailEmpresa: string;
  giroNegocio: string;
  emailContacto: string;
  fechaInscripcion: string;
  usuarioBanco: string;
  nombreContacto: string;
  swSPE: string;
  swActividad: boolean;
  swAudiCre: string;
  swAudiMod: string;
  Services: ServiceCustomer[] = [];
}
