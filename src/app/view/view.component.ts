import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  paises: any = [];

  pais_in: any;

  form: any = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', [Validators.minLength(2), Validators.required]),
    capital: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    regiao: new FormControl('', [Validators.minLength(2), Validators.required]),
    subRegiao: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    area: new FormControl('', [Validators.minLength(2), Validators.required]),
  });

  constructor(private request: RequestsService) {}

  ngOnInit(): void {
    this.getAllPaises();
  }
  // Get all countries
  getAllPaises(): void {
    this.request.get('/all').subscribe((res: any) => {
      this.paises = res;
    });
  }

  // Notifications
  successNotification() {
    Swal.fire('Sucesso', 'País atualizado com sucesso!', 'success');
  }

  successEditNotification() {
    Swal.fire('Sucesso', 'País apagado com sucesso!', 'success');
  }

  errorNotification() {
    Swal.fire({
      title: 'Ocorreu um erro!',
      text: 'Tente novamente.',
      icon: 'warning',
    });
  }

  // Update
  updatePais(): void {
    this.request.put('/update', this.pais_in).subscribe(
      (res: any) => {
        this.successNotification();
      },
      (err: any) => {
        this.errorNotification();
      }
    );
  }

  // Delete
  deletePais(id: number): void {
    this.request.delete(`/delete/${id}`).subscribe(
      (res: any) => {
        this.successEditNotification();
        this.getAllPaises();
      },
      (err: any) => {
        this.errorNotification();
      }
    );
  }

  openEditModal(pais: any): void {
    const modal = document.getElementById('editModal');
    modal?.classList.add('flex');
    modal?.classList.remove('hidden');
    this.pais_in = pais;
    this.form.patchValue({
      id: this.pais_in.id,
      nome: this.pais_in.nome,
      capital: this.pais_in.capital,
      regiao: this.pais_in.regiao,
      subRegiao: this.pais_in.subRegiao,
      area: this.pais_in.area,
    });
  }

  closeEditModal(): void {
    const modal = document.getElementById('editModal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
    this.form.reset();
  }
}
