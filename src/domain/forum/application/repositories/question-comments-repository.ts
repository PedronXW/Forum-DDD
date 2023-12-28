import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentRepository {
  abstract create(question: QuestionComment): Promise<void>
  abstract delete(question: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}
