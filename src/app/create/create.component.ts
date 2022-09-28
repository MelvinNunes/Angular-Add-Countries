import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private request: RequestsService) {}

  ngOnInit(): void {}

  form: any = new FormGroup({
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

  error: any = {
    err: false,
    message: null,
    title: null,
  };

  successNotification() {
    Swal.fire('Sucesso', 'País adicionado!', 'success');
  }

  errorNotification() {
    Swal.fire({
      title: 'Ocorreu um erro!',
      text: 'Tente novamente.',
      icon: 'warning',
    });
  }

  createPais(): void {
    let Pais: any = {
      nome: this.form.value.nome,
      capital: this.form.value.capital,
      regiao: this.form.value.regiao,
      subRegiao: this.form.value.subRegiao,
      area: this.form.value.area,
    };
    this.request.post('/add', Pais).subscribe(
      (res: any) => {
        this.successNotification();
      },
      (err: any) => {
        this.errorNotification();
      }
    );
  }
}
