import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Task, Board } from "./board.model";
import * as firebase from "firebase";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  //
  // Create a new board
  //

  async createBoard(data: Board) {
    const user = await this.afAuth.auth.currentUser;
    console.log(user.uid);
    return this.db
      .collection("users")
      .doc(user.uid)
      .collection("books")
      .add({
        ...data,
        uid: user.uid,
        tasks: [{ description: "Hello!", label: "yellow" }],
      });
  }

  //
  // Delete board
  //

  deleteBoard(boardId: string) {
    return this.db.collection("boards").doc(boardId).delete();
  }

  //
  // Updates the tasks on board
  //

  updateWords(boardId: string, tasks: Task[]) {
    return this.db.collection("boards").doc(boardId).update({ tasks });
  }

  //
  // Remove a specifc task from the board
  //

  removeTask(boardId: string, task: Task) {
    return this.db
      .collection("boards")
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  //
  // Get all boards owned by current user
  //

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection("users")
            .doc(user.uid)
            .collection<Board>("books", (ref) =>
              ref.where("uid", "==", user.uid).orderBy("priority")
            )
            .valueChanges({ idField: "id" });
        } else {
          return [];
        }
      })
    );
  }

  //
  // Run a batch write to change the priority of each board for sorting
  //

  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection("boards").doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
