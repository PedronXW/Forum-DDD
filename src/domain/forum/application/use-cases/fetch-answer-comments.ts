import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: AnswerComment[]
  }
>

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      { page },
    )

    return right({ comments })
  }
}
