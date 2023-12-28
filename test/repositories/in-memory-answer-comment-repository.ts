import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answerComments
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComments = this.items.find((item) => item.id.toString() === id)

    if (!answerComments) {
      return null
    }

    return answerComments
  }

  async delete(answer: AnswerComment): Promise<void> {
    const answerComments = this.items.filter((item) => item !== answer)
    this.items = answerComments
  }
}
