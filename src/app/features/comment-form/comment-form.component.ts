import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentService } from '../../core/services/comment.service';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../../core/models/comments';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class CommentFormComponent {
  @Input({ required: true }) offerId!: string | undefined;
  @Output() commentAdded = new EventEmitter<Comment>();

  private fb: FormBuilder = inject(FormBuilder);
  private commentService: CommentService = inject(CommentService);
  private destroySubject: Subject<void> = new Subject<void>();

  commentForm: FormGroup = this.fb.group({
    rating: ['', Validators.required],
    comment: ['', [Validators.required, Validators.minLength(50)]],
  });

  public onSubmit() {
    if (this.commentForm.valid) {
      const { comment, rating } = this.commentForm.value;
      console.log(this.commentForm.value);
      this.commentService
        .postComment(comment, Number(rating), this.offerId)
        .pipe(takeUntil(this.destroySubject))
        .subscribe({
          next: (comment: Comment) => this.commentAdded.emit(comment),
          complete: () => this.commentForm.reset(),
        });
    }
  }
}
