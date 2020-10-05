import { Component, OnInit, Input } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { BookService } from "../book.service";
import { BookDialogComponent } from "../dialogs/board-dialog.component";
import { TaskDialogComponent } from "../dialogs/task-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Task } from "../board.model";
import { VocabDialogComponent } from "../dialogs/vocab/vocab.component";

@Component({
  selector: "app-board",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent {
  @Input() book;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: "purple" };
    const dialogRef = this.dialog.open(VocabDialogComponent, {
      width: "500px",
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.book.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.bookService.updateWords(this.book.id, [
            ...this.book.tasks,
            result.task,
          ]);
        } else {
          const update = this.book.tasks;
          update.splice(result.idx, 1, result.task);
          this.bookService.updateWords(this.book.id, this.book.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.bookService.deleteBoard(this.book.id);
  }
}
