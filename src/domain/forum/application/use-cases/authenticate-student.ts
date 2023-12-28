import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { StudentsRepository } from '../repositories/students-repository'
import { WrongCredentialError } from './errors/wrong-credentials-error'

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialError,
  {
    accessToken: string
  }
>

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialError())
    }

    const passwordMatch = await this.hashCompare.compare(
      password,
      student.password,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
