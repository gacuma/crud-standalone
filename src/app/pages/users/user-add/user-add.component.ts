import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../../../commons/interfaces/player.interface';
import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  playersService = inject(PlayersService);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([])
  });

  get decks() {
    return (this.form.get('decks') as FormArray).controls;
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl('', Validators.required)
      })
    )
  }

  addPlayer() {
    this.playersService.addPlayer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Player);
    this.router.navigate(['users']);
  }
}
