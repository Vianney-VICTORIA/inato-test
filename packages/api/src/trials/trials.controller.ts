import { Get, Query } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { TrialsService } from './trials.service'
import { ITrialsParams } from './trials.types'

@Controller('trials')
export class TrialsController {
  constructor(private readonly trialsService: TrialsService) {}

  @Get()
  getTrials(@Query() query: ITrialsParams): string {
    return this.trialsService.getTrials()
  }

  //create a new get trial enpoind
  @Get('/new')
  create(): string {
    return 'new trial'
  }
}
