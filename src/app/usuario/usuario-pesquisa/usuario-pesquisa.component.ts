import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DataTable } from 'primeng/components/datatable/datatable';

import { PaginationData, FilterData } from '../../shared/pagination';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styles: []
})
export class UsuarioPesquisaComponent implements OnInit {

  @ViewChild('dt') dt: DataTable;
  pagination: PaginationData;
  filter: FilterData;
  filterForm: FormGroup;
  data: any;
  podeEditar = false;
  podeRemover = false;
  isSofthouse = false;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.pagination = new PaginationData();
    this.filter = new FilterData();

    this.filterForm = this.fb.group({
      nome: ['', []],
      email: ['', []]
    });

    this.podeEditar = this.auth.validAuthorities('ROLE_USUARIOS_E');
    this.podeRemover = this.auth.validAuthorities('ROLE_USUARIOS_X');
    this.isSofthouse = this.auth.validAuthorities('ROLE_CONTRATOS_P');
  }

  onDataGridLoad(event) {
    this.pagination.setEvent(event);
    this.getServiceData();
  }

  onFilterSubmit(event) {
    this.filter.clear();
    this.filter.setParam('nome', this.filterForm.get('nome').value);
    this.filter.setParam('email', this.filterForm.get('email').value);
    this.dt.reset(); //onDataGridLoad()/Page:0
  }

  getServiceData() {
    this.usuarioService.onDataGridLoad(this.pagination, this.filter)
      .then(result => {
        this.data = result.content;
        this.pagination.size = result.size;
        this.pagination.totalElements = result.totalElements;
      });
  }

  onRemover(contrato) {
    this.confirmationService.confirm({
      message: 'Gostaria de Remover o Registro?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.usuarioService.onRemover(contrato).then(result => {
          this.getServiceData();
        });
      }
    });
  }

}
