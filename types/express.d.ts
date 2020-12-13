import {
  getPostsOptionsFilter,
  getPostsOptionsPagination,
} from '../src/post/post.service';
import { TokenPayload } from '../src/auth/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      fileMetadata: { width?: number; height?: number; metadata?: {} };
      sort: string;
      filter: getPostsOptionsFilter;
      pagination: getPostsOptionsPagination;
    }
  }
}
