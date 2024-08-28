import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoTableColumn, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';

import { Cidades } from '../cidades';
import { CidadesService } from '../cidades.service';

@Component({
  selector: 'app-cidades-list',
  templateUrl: './cidades-list.component.html',
  styleUrls: ['./cidades-list.component.css']
})
export class CidadesListComponent implements OnInit {
  form!: FormGroup;
  cidade: Cidades;

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string'
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    }
  ];

  items: Cidades[] = [];
  actionsTable = [
    {
      action: this.perguntaEditarCidade.bind(this),
      label: 'Editar',
      icon: 'po-icon po-icon-edit'
    },
    {
      action: this.perguntaExcluirCidade.bind(this),
      label: 'Excluir',
      icon: 'po-icon po-icon-delete'
    }
  ];

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarCidade.close();
    },
    label: 'Cancelar',
    danger: true
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarCidade();
    },
    label: 'Confirmar'
  };

  cancelarCadastroCidade: PoModalAction = {
    action: () => {
      this.perguntaCancelarEdicao();
    },
    label: 'Cancelar',
    danger: true
  };

  editarCadastroCidade: PoModalAction = {
    action: () => {
      this.editarCidade();
    },
    label: 'Confirmar'
  };

  excluirCadastroCidade: PoModalAction = {
    action: () => {
      this.excluirCidade();
    },
    label: 'Confirmar'
  };

  cancelarExclusaoCidade: PoModalAction = {
    action: () => {
      this.cancelarExcluirCidade();
    },
    label: 'Cancelar',
    danger: true
  };

  @ViewChild(PoModalComponent, { static: true }) modalSalvarCidade!: PoModalComponent;
  @ViewChild('modalEdicaoCidade', { static: true }) modalEdicaoCidade!: PoModalComponent;
  @ViewChild('modalExcluirCidade', { static: true }) modalExcluirCidade!: PoModalComponent;

  readonly breadcrump: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Cidades', link: '/cidades' }
    ]
  };

  constructor(private service: CidadesService, private formBuilder: FormBuilder, private poNotification: PoNotificationService) {
    this.cidade = new Cidades();
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.listarCidades();
  }

  iniciarForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])]
    });
  }

  listarCidades(): void {
    this.service.listarTodos().subscribe(res => {
      this.items = res;
    });
  }

  onQuickSearch(filter: any) {
    console.log(filter);
    console.log(typeof filter);
    filter && (typeof filter == 'string') ? this.searchItems(filter) : this.listarCidades();
  }

  private searchItems(filter: any) {
    console.log(filter);
    this.service.listarCidadesFiltroPorNome(filter).subscribe(res => {
      this.items = res;
    });
  }

  novaCidade() {
    this.limparForm();
    this.modalSalvarCidade.open();
  }

  perguntaExcluirCidade(cidade: Cidades) {
    this.cidade = cidade;
    this.modalExcluirCidade.open();
  }

  excluirCidade() {
    this.service.deletar(this.cidade.id).subscribe(
      res => {
        this.poNotification.success('Cidade excluída com sucesso!');
        this.listarCidades();
      },
      error => {
        this.poNotification.error('Não foi possível excluir a cidade!');
      }
    );
    this.modalExcluirCidade.close();
  }

  cancelarExcluirCidade() {
    this.modalExcluirCidade.close();
  }

  perguntaCancelarEdicao() {
    this.modalEdicaoCidade.close();
    this.ngOnInit();
  }

  salvarCidade() {
    console.log(this.cidade);
    console.log(this.form.get("nome")?.value)
    const cidade = new Cidades();
    cidade.nome = this.form.get("nome")?.value;
    this.service.salvar(cidade).subscribe(
      res => {
        this.poNotification.success('Cidade salva com sucesso!');
        this.listarCidades();
      },
      error => {
        this.poNotification.error('Não foi possível salvar a nova cidade');
      }
    );
    this.modalSalvarCidade.close();
  }

  perguntaEditarCidade(cidade: Cidades) {
    this.cidade = cidade;
    this.form.get('nome')?.setValue(this.cidade.nome);
    this.modalEdicaoCidade.open();
  }

  editarCidade() {
    console.log(this.form.get('nome')?.value);
    console.log(this.cidade);
    const cidade = new Cidades();
    cidade.nome = this.form.get("nome")?.value;
    this.service.atualizar(this.cidade.id, cidade).subscribe(
      res => {
        this.cidade = res;
        this.poNotification.success('Cidade editada com sucesso!');
        this.listarCidades();
      },
      error => {
        this.poNotification.error('Não foi possível editar a cidade');
      }
    );
    this.modalEdicaoCidade.close();
  }

  limparForm(): void {
    this.form.get('nome')?.setValue(null);

  }
}
