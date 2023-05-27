import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime } from 'rxjs';
import { Player } from '../../../commons/interfaces/player.interface';
import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  playerService = inject(PlayersService); // esto se usa en vez del constructor
  router = inject(Router);

  players$!: Observable<Player[]>;
  searcher = new FormControl('');

  // constructor(private playerService: PlayersService) {}

  ngOnInit(): void {
    // this.playerService.getPlayer().subscribe((res) => console.log(res));
    this.players$ = this.playerService.getPlayer();
    
    this.searcher.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe((search) => {
      console.log(search);
      
      if(search) {
        this.players$ = this.playerService.getPlayer(search);
      } else {
        this.players$ = this.playerService.getPlayer();
      } 
    });
  }

  editPlayer(player: Player) {
    this.router.navigateByUrl('users/edit', {state: {player}});
  }

  deletePlayer(player: Player) {
    if(confirm(`Seguro de borrar a ${player.name}`)) {
      this.playerService.deletePlayer(player.id);
    }
  }
}
