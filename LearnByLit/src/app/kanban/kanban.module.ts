import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KanbanRoutingModule } from "./kanban-routing.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { BookListComponent } from "./book-list/book-list.component";
import { BookComponent } from "./book/book.component";
import { BookDialogComponent } from "./dialogs/board-dialog.component";
import { TaskDialogComponent } from "./dialogs/task-dialog.component";
import { VocabComponent } from './dialogs/vocab/vocab.component';

@NgModule({
  declarations: [
    BookComponent,
    BookDialogComponent,
    TaskDialogComponent,
    BookListComponent,
    VocabComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [BookDialogComponent, TaskDialogComponent],
})
export class KanbanModule {}
