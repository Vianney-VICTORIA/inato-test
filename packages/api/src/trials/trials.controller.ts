import { Get, Query, ValidationPipe, UsePipes } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { TrialsQueryRequestDto } from './dto/trials-query.request.dto'
import { TrialsService } from './trials.service'

@Controller('trials')
export class TrialsController {
  constructor(private readonly trialsService: TrialsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getTrials(@Query() queryParams: TrialsQueryRequestDto) {
    const query = {
      sponsor: queryParams.sponsor,
      countryCode: queryParams.countryCode
    }
    const result = await this.trialsService.getTrials(query)

    // TODO: Here in a real app, we would return a New DTO instead of the raw data
    // return new TrialsQueryResponseDto({data: result})
    return {
      data: result
    }
  }
}
