import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../../../commons/interfaces/player.interface';
import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  playersService = inject(PlayersService)
  location = inject(Location);
  router = inject(Router);
  
  player!: Player;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  ngOnInit(): void {
    console.log(this.location.getState());
    this.player = (this.location.getState() as any).player;
    if(this.player) {
      this.setCurrentPlayer(this.player);
    }
  }

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

  setCurrentPlayer(player: any) {
    this.form.patchValue(this.player as any);

    player.decks.map((deck: any) => {
      console.log(deck);
      
      const deckForm = new FormGroup({
        name: new FormControl(deck.name),
        cards: new FormControl(deck.cards),
      });
      (this.form.get('decks') as FormArray).push(deckForm);
    });
  }

  updatePalyer() {
    this.playersService.updatPlayer({
      id: this.player.id,
      ...this.form.getRawValue()
    } as Player);

    this.router.navigate(['users']);
  }
}
