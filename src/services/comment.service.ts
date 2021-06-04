import { Service } from 'fastify-decorators';
import { getConnection, Repository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { AddComment } from '../interfaces/comment.interface';

@Service()
export class CommentService {
  private readonly commentRepo: Repository<Comment> = getConnection().getRepository(Comment);

  add({ locationId, userId, description }: AddComment) {
    const com = new Comment();
    com.location = locationId;
    com.description = description;
    com.user = userId;
    return this.commentRepo.save(com);
  }

  get(locationId: number) {
    return this.commentRepo.createQueryBuilder('comments')
      .select('comments.id, concat(first_name, \' \', last_name) AS user_name, comments.created_at, description')
      .leftJoin('user', 'u', 'u.id = comments.userId')
      .where('comments.locationId = :locationId', { locationId })
      .orderBy('comments.created_at')
      .getRawMany();
  }
}
