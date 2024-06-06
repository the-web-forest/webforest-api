import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('news')
@ApiTags('news')
export class NewsController {

}
