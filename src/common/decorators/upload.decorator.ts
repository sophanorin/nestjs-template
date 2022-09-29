import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';

// import { AwsService } from '../../aws/aws.service';
// import { Properties } from '../../../output/entities/Properties';
import { ConfigService } from '../providers/config.service';

export const Upload = createParamDecorator((_data: unknown, _ctx: ExecutionContext) => {
    //   const request: Express.Request = ctx.switchToHttp().getRequest<Express.Request>();

    //   const files: Express.Multer.File[] = request.files as Express.Multer.File[];

    const awsInjection = Inject(ConfigService);

    return (target: Record<string, any>, _: any, descriptor: PropertyDescriptor): void => {
        awsInjection(target, 'config');
        const properties = descriptor.value;

        console.log(descriptor);

        console.log(properties);
    };
});
