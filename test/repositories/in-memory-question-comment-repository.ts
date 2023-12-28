import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return questionComments
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComments = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!questionComments) {
      return null
    }

    return questionComments
  }

  async delete(question: QuestionComment): Promise<void> {
    const questionComments = this.items.filter((item) => item !== question)
    this.items = questionComments
  }
}
