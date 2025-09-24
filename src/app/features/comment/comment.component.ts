import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../core/models/comments';
import { DateFormatPipe } from './pipes/date-format.pipe';
import dayjs from 'dayjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  imports: [DateFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;
  protected readonly Math = Math;
  protected readonly dayjs = dayjs;
}
