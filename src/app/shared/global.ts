// global.ts
import { Injectable, Output } from '@angular/core';

@Injectable()
export class Global {

  // tslint:disable-next-line:no-inferrable-types
  public static AUTHORIZATION: string = 'Basic Y2xpZW50LWFuZ3VsYXI6c2VjcmV0LWFuZ3VsYXI=';
  // tslint:disable-next-line:no-inferrable-types
  public static DOMAIN: string = 'http://angulareclipse.tld:8080';

  public static formatoDataPadrao: String = 'dd/mm/yy';
  public static formatoMoedaPadrao = { prefix: 'R$ ', thousands: '.', decimal: ',', allowNegative: false };
  public static formatoMascaraCep: String = '99.999-999';

  public static ESTADOS = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' }
  ];

  public static MENU_DO_APLICATIVO = [
    {
      group: 'Favoritos',
      expanded: false,
      icon: 'fa fa-bookmark',
      items: []
    },

    {
      group: 'Cadastros',
      expanded: false,
      icon: 'fa fa-sitemap',
      items: [
        { name: 'Contratos', icon: 'fa fa-sitemap', url: '/contratos', authoritie: 'ROLE_CONTRATOS_P' },
        { name: 'Usuários', icon: 'fa fa-sitemap', url: '/usuarios', authoritie: 'ROLE_USUARIOS_P' },
        { name: 'Clientes', icon: 'fa fa-sitemap', url: '/clientes', authoritie: 'ROLE_CLIENTES_P' },
        { name: 'Transportadoras', icon: 'fa fa-sitemap', url: '/transportadoras', authoritie: 'ROLE_TRANSPORTADORAS_P' }
      ]
    },

    {
      group: 'Relatórios',
      expanded: false,
      icon: 'fa fa-file-text-o',
      items: [
        { name: 'Clientes', icon: 'fa fa-file-text-o', url: '/relatorios/clientes', authoritie: 'ROLE_R_CLIENTES' }
      ]
    },

    {
      group: 'Configuraçoes',
      expanded: false,
      icon: 'fa fa-cogs',
      items: [
        { name: 'Certificado Digital', icon: 'fa fa-certificate', url: '/configuracoes/certificado', authoritie: 'ROLE_X_CERTIFICADO' },
        { name: 'Tributação', icon: 'fa fa-cogs', url: '/configuracoes/tributacao', authoritie: 'ROLE_X_TRIBUTACAO' },
      ]
    }

  ];

}
