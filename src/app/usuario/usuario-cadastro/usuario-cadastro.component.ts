import { AuthService } from './../../security/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';

import { UsuarioService } from './../usuario.service';
import { Global } from '../../shared/global';
import { Usuario } from '../../model/usuario';
import { Permissao } from '../../model/permissao';
import { ContratoService } from '../../contrato/contrato.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styles: []
})

export class UsuarioCadastroComponent implements OnInit {

  usuario: FormGroup;
  codigo: number;
  permissoesDisponiveis: Permissao[];
  permissoesAtivas: Permissao[];
  contratoSugestao: any[];
  isSofthouse = false;

  @ViewChild('contrato') contratoAutoComplete: AutoComplete;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private contratoService: ContratoService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.isSofthouse = this.auth.validAuthorities('ROLE_CONTRATOS_P');

    this.usuario = this.fb.group({
      codigo: ['', []],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrato: ['', this.validatorsContratoSofthouse()],
      permissoes: this.fb.array([])
    });

    this.usuarioService.onRecuperaPermissoes()
      .then(permissoes => {
        this.permissoesDisponiveis = permissoes;
      });

    this.codigo = this.route.snapshot.params['codigo'];
    if (this.codigo) {
      this.usuarioService.onRecupera(this.codigo)
        .then(usuario => {
          this.usuario.patchValue(usuario);
          this.contratoAutoComplete.search(null, usuario.contrato.fantasia);
          this.permissoesAtivas = usuario.permissoes;
        });
    }
  }

  validatorsContratoSofthouse(): any[] {
    if (this.isSofthouse) {
      return [Validators.required];
    }
  }

  onContratoFindBy(event) {
    this.contratoService.findBy('fantasia', event.query)
      .then(findBy => {
        this.contratoSugestao = findBy;
      });
  }

  onPersiste({ value, valid }: { value: Usuario, valid: boolean }) {
    if (valid) {
      value.codigo = (this.codigo) ? this.codigo : null;
      value.contrato = (this.isSofthouse) ? value.contrato : null;
      value.permissoes = [];
      if (this.permissoesAtivas) {
        this.permissoesAtivas.forEach(element => {
          value.permissoes.push({ codigo: element.codigo, descricao: element.descricao });
        });
      }
      console.log(value);
      this.usuarioService.onPersiste(value).then(usuario => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  onRemoverPermissao(p, i) {
    this.confirmationService.confirm({
      message: `Remover a permissão [${p.descricao}] ? `,
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.permissoesAtivas.splice(i, 1);
      }
    });

  }

}
