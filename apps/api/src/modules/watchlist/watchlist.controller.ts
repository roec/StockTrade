import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('watchlists')
export class WatchlistController {
  constructor(private readonly service: WatchlistService) {}
  @Get() list() { return this.service.list(); }
  @Post() create(@Body() body: { name: string; symbols: string[]; type: '自选股' | '策略池' | '候选池' }) { return this.service.create(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: { name?: string; symbols?: string[] }) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
