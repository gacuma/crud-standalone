import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Player } from '../commons/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private fireStore: Firestore) { }

  addPlayer(player: Player){
    const playerRef = collection(this.fireStore, 'players');
    return addDoc(playerRef, player)
  }

  getPlayer(filter = '') {
    const playerRef = collection(this.fireStore, 'players');
    let queryData = query(playerRef);

    if(filter) {
      queryData = query(playerRef, where('name', '==', filter));
    }

    return collectionData(queryData) as unknown as Observable<Player[]>;
  }

  async updatPlayer(player: Player) {
    const playerRef = collection(this.fireStore, 'players');
    let q = query(playerRef, where('id', '==', player.id));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach(async (document) => {
      const docRef = doc(this.fireStore, 'players', document.id);
      await updateDoc(docRef, {...player})
    })
  }

  async deletePlayer(id: string) {
    const playerRef = collection(this.fireStore, 'players');
    let q = query(playerRef, where('id', '==', id));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach(async (document) => {
      const docRef = doc(this.fireStore, 'players', document.id);
      await deleteDoc(docRef)
    })
  }
}
