import { Module } from '@nestjs/common'
import { TrialsModule } from './trials/trials.module'

@Module({
  imports: [TrialsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
