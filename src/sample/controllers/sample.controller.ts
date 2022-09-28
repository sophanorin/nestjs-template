import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../../auth';
import { Roles, RolesGuard, Logger, ConfigService } from '../../common';
import type { User } from '../../entity/user';
import { FoobarService } from '../../shared/foobar';
import { UserDto } from '../dto';
import { DatabaseService } from '../providers';

/**
 * route /api/v1/sample/*
 */
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('sample')
export class SampleController {
  constructor(
    private readonly logger: Logger,
    private config: ConfigService,
    private dbquery: DatabaseService,
    private foobarService: FoobarService,
  ) {
    this.logger.setContext(SampleController.name);
  }

  @Get() // http://localhost:3000/test/sample
  public sample(): Record<string, unknown> {
    this.logger.log('this is sample');

    return {
      hello: this.config.get('hello'),
      foo: this.config.get('foo'),
    };
  }

  @Get('hello') // http://localhost:3000/test/sample/hello
  public hello(@Req() req: Request, @Res() res: Response): void {
    res.json({
      message: req.originalUrl,
    });
  }

  @Get('hello/query') // http://localhost:3000/test/sample/hello/query?name=anything
  public helloQuery(@Query('name') name: string): string {
    if (!name) {
      throw new BadRequestException('InvalidParameter');
    }

    return `helloQuery: ${name}`;
  }

  @Get('hello/param/:name') // http://localhost:3000/test/sample/hello/param/anything
  public helloParam(@Param('name') name: string): string {
    return `helloParam: ${name}`;
  }

  @Get('hello/number/:foo') // http://localhost:3000/test/sample/hello/number/123?bar=456&blah=789
  public helloNumber(@Param('foo') foo: number, @Query('bar') bar: string, @Query('blah', ParseIntPipe) blah: number): AnyObject {
    return { foo, bar, blah };
  }

  @Post('hello/body') // http://localhost:3000/test/sample/hello/body
  public helloBody(@Body() param: UserDto): string {
    return `helloBody: ${JSON.stringify(param)}`;
  }

  @Get('database')
  public async database(): Promise<User[]> {
    // return this.dbquery.sample2();
    return this.dbquery.sample3();
    // return this.dbquery.sample1();
  }

  @Get('foobars')
  public async foobars(): Promise<User[]> {
    return this.foobarService.getFoobars();
  }

  @Get('admin') // http://localhost:3000/test/sample/admin
  @Roles('admin')
  public admin() {
    return 'Need admin role';
  }
}
