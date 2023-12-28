import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: QuestionComment[]
  }
>

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ comments })
  }
}
