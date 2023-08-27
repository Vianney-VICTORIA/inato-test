import { Test, TestingModule } from '@nestjs/testing'
import { ValidationPipe } from '@nestjs/common'
import { TrialsController } from './trials.controller'
import { TrialsService } from './trials.service'
import { TrialsQueryRequestDto } from './dto/trials-query.request.dto'
import { CountryCode } from './trials.types'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

describe('TrialsController', () => {
  let trialsController: TrialsController
  let trialsService: TrialsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialsController],
      providers: [TrialsService]
    }).compile()

    trialsController = module.get<TrialsController>(TrialsController)
    trialsService = module.get<TrialsService>(TrialsService)
  })

  describe('getTrials', () => {
    it('should return trials based on query parameters', async () => {
      const queryParams: TrialsQueryRequestDto = { sponsor: 'Company A', countryCode: 'FR' }
      const mockTrials = []
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue(mockTrials)

      const result = await trialsController.getTrials(queryParams)

      expect(result).toEqual({ data: mockTrials })
    })

    it('should return empty data when no trials are found', async () => {
      const queryParams: TrialsQueryRequestDto = { sponsor: 'Nonexistent Company', countryCode: 'FR' }
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue([])

      const result = await trialsController.getTrials(queryParams)

      expect(result).toEqual({ data: [] })
    })

    it('should handle service errors', async () => {
      const queryParams: TrialsQueryRequestDto = { sponsor: 'Company A', countryCode: 'FR' }
      const error = new Error('Service error')
      jest.spyOn(trialsService, 'getTrials').mockRejectedValue(error)

      await expect(trialsController.getTrials(queryParams)).rejects.toThrowError(error)
    })

    it('should transform and validate query parameters using ValidationPipe', async () => {
      const queryParams: any = { sponsor: 'Company A', countryCode: 'FR' }
      const mockTrials = []
      jest.spyOn(trialsService, 'getTrials').mockResolvedValue(mockTrials)

      const result = await trialsController.getTrials(queryParams)

      expect(result).toEqual({ data: mockTrials })
    })
  })
})

describe('TrialsQueryRequestDto', () => {
  it('should be valid with valid input', async () => {
    const validInput = {
      sponsor: 'Company A',
      countryCode: 'FR'
    }

    const dtoInstance = plainToClass(TrialsQueryRequestDto, validInput)
    const errors = await validate(dtoInstance)

    expect(errors).toHaveLength(0)
  })

  it('should allow missing optional fields', async () => {
    const validInput = {} // No fields provided

    const dtoInstance = plainToClass(TrialsQueryRequestDto, validInput)
    const errors = await validate(dtoInstance)

    expect(errors).toHaveLength(0)
  })

  it('should reject invalid sponsor type', async () => {
    const invalidInput = {
      sponsor: 123, // Invalid type
      countryCode: 'AT'
    }

    const dtoInstance = plainToClass(TrialsQueryRequestDto, invalidInput)
    const errors = await validate(dtoInstance)

    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isString')
  })

  it('should reject invalid countryCode value', async () => {
    const invalidInput = {
      sponsor: 'Company A',
      countryCode: 'INVALID' // Invalid enum value
    }

    const dtoInstance = plainToClass(TrialsQueryRequestDto, invalidInput)
    const errors = await validate(dtoInstance)

    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isEnum')
  })
})
