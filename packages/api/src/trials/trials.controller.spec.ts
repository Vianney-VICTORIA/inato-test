import { Test, TestingModule } from '@nestjs/testing'
import { TrialsController } from './trials.controller'
import { TrialsService } from './trials.service'
import { TrialsQueryRequestDto } from './dto/trials-query.request.dto'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { HttpModule } from '@nestjs/axios'

describe('TrialsController', () => {
  let trialsController: TrialsController
  let trialsService: TrialsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TrialsController],
      providers: [TrialsService]
    }).compile()

    trialsController = module.get<TrialsController>(TrialsController)
    trialsService = module.get<TrialsService>(TrialsService)
  })

  describe('getTrials', () => {
    it('should return trials based on query parameters', async () => {
      const queryParams: TrialsQueryRequestDto = { sponsor: 'Sanofi' }
      const mockTrials = []
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue(mockTrials)
      const result = await trialsController.getTrials(queryParams)
      expect(result).toEqual({ data: mockTrials })
    })

    it('should return empty data when no trials are found for a given parameter', async () => {
      const queryParams: TrialsQueryRequestDto = { sponsor: 'Nonexistent Company' }
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue([])
      const result = await trialsController.getTrials(queryParams)
      expect(result).toEqual({ data: [] })
    })

    // TODO: Vianney TO refactor
    it('should validate query parameters using ValidationPipe', async () => {
      const queryParams: any = { sponsor: 'Company A', countryCode: 'FR' }
      const mockTrials = []
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue(mockTrials)
      const result = await trialsController.getTrials(queryParams)
      expect(result).toEqual({ data: mockTrials })
    })
  })
})

describe('TrialsQueryRequestDto', () => {
  it('should be valid with valid inputs', async () => {
    const validInput = {
      sponsor: 'Company A',
      countryCode: 'FR'
    }
    const dtoInstance = plainToClass(TrialsQueryRequestDto, validInput)
    const errors = await validate(dtoInstance)
    expect(errors).toHaveLength(0)
  })

  it('should allow missing optional fields', async () => {
    const validInput = {} // No fields provided as both are optionnal
    const dtoInstance = plainToClass(TrialsQueryRequestDto, validInput)
    const errors = await validate(dtoInstance)
    expect(errors).toHaveLength(0)
  })

  it('should reject invalid sponsor type', async () => {
    const invalidInput = {
      sponsor: ['Company A']
    }
    const dtoInstance = plainToClass(TrialsQueryRequestDto, invalidInput)
    const errors = await validate(dtoInstance)
    // make sure there is an error
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isString')
  })

  it('should reject invalid countryCode value', async () => {
    const invalidInput = {
      sponsor: 'Company A',
      countryCode: 'INVALID'
    }
    const dtoInstance = plainToClass(TrialsQueryRequestDto, invalidInput)
    const errors = await validate(dtoInstance)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isEnum')
  })
})
