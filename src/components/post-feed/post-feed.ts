import { Component } from '@angular/core';
import { UbInputDirective } from '@/shared/ui/input';
import { Post } from '../post/post';

@Component({
  selector: 'app-post-feed',
  imports: [UbInputDirective, Post],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.css',
})
export class PostFeed {}
