import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FetchQuestionAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

interface FetchQuestionAnswerUseCaseRequest {
  page: number
  questionId: string
}

@Injectable()
export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!answers) {
      return left(new ResourceNotFoundError())
    }

    return right({ answers })
  }
}
