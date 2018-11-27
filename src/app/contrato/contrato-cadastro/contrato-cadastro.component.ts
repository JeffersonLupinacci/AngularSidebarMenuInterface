import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContratoService } from './../contrato.service';
import { Global } from '../../shared/global';
import { Contrato } from '../../model/contrato';

@Component({
  selector: 'app-contrato-cadastro',
  templateUrl: './contrato-cadastro.component.html',
  styles: []
})

export class ContratoCadastroComponent implements OnInit {

  contrato: FormGroup;
  estados: any[] = Global.ESTADOS;
  codigo: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratoService: ContratoService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.contrato = this.fb.group({
      fantasia: ['', [Validators.required, Validators.minLength(10)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(10)]],
      cnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      aliases: ['', Validators.required],
      ativo: ['', []],
      dataRegistro: ['', []],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', Validators.required],
        complemento: ['', []],
      })
    });

    this.codigo = this.route.snapshot.params['codigo'];
    if (this.codigo) {
      this.contratoService.onRecupera(this.codigo)
        .then(contrato => {
          this.contrato.patchValue(contrato);
        });
    }

  }

  onPersiste({ value, valid }: { value: Contrato, valid: boolean }) {
    if (valid) {
      value.codigo = (this.codigo) ? this.codigo : null;
      this.contratoService.onPersiste(value).then(contrato => {
        this.router.navigate(['/contratos']);
      });
    }
  }

}
