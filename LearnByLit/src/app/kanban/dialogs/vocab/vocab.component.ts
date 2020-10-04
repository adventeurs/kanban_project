import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BookService } from "../../book.service";

@Component({
  selector: "app-vocab",
  templateUrl: "./vocab.component.html",
  styleUrls: ["./vocab.component.scss"],
})
export class VocabComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VocabComponent>,
    public bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public vocab: any
  ) {}

  ngOnInit() {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.vocab.tasks, event.previousIndex, event.currentIndex);
    this.bookService.updateTasks(this.vocab.id, this.vocab.tasks);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
