import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DataTable } from 'primeng/components/datatable/datatable';

import { PaginationData, FilterData } from '../../shared/pagination';
import { ContratoService } from '../contrato.service';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-contrato-pesquisa',
  templateUrl: './contrato-pesquisa.component.html',
  styles: []
})
export class ContratoPesquisaComponent implements OnInit {

  @ViewChild('dt') dt: DataTable;
  pagination: PaginationData;
  filter: FilterData;
  filterForm: FormGroup;
  data: any;
  podeEditar = false;
  podeRemover = false;

  constructor(
    private contratoService: ContratoService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private fb: FormBuilder) {
    this.podeEditar = this.auth.validAuthorities('ROLE_CONTRATOS_E');
    this.podeRemover = this.auth.validAuthorities('ROLE_CONTRATOS_X');
  }

  ngOnInit() {
    this.pagination = new PaginationData();
    this.filter = new FilterData();

    this.filterForm = this.fb.group({
      fantasia: ['', []],
      cidade: ['', []]
    });
  }

  onDataGridLoad(event) {
    this.pagination.setEvent(event);
    this.getServiceData();
  }

  onFilterSubmit(event) {
    this.filter.clear();
    this.filter.setParam('fantasia', this.filterForm.get('fantasia').value);
    this.filter.setParam('cidade', this.filterForm.get('cidade').value);
    this.dt.reset(); //onDataGridLoad()/Page:0
  }

  getServiceData() {
    this.contratoService.onDataGridLoad(this.pagination, this.filter)
      .then(result => {
        this.data = result.content;
        this.pagination.size = result.size;
        this.pagination.totalElements = result.totalElements;
      });
  }

  onAlteraStatus(contrato) {
    this.contratoService.onAlteraStatus(contrato).then(result => {
      this.getServiceData();
    });
  }

  onRemover(contrato) {
    this.confirmationService.confirm({
      message: 'Gostaria de Remover o Registro?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.contratoService.onRemover(contrato).then(result => {
          this.getServiceData();
        });
      }
    });
  }

}
