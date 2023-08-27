import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TrialsService } from './trials.service'
import { TrialsController } from './trials.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  controllers: [TrialsController],
  providers: [TrialsService]
})
export class TrialsModule {}
