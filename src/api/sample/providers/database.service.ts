import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { User, Role } from '../../../entity';

/**
 * Database Query Execution Example
 */
@Injectable()
export class DatabaseService {
    private tablerepo: Repository<User>;

    constructor(
        /**
         * Sample1
         * https://typeorm.io/#/working-with-repository
         * https://typeorm.io/#/repository-api
         * Need TypeOrmModule.forFeature([]) imports
         */
        @InjectRepository(User)
        private user: Repository<User>,

        /**
         * Sample2
         * https://typeorm.io/#/working-with-entity-manager
         * https://typeorm.io/#/entity-manager-api
         */
        @InjectEntityManager()
        private manager: EntityManager,
    ) {
        /**
         * Sample3
         * https://typeorm.io/#/entity-manager-api - getRepository
         */
        this.tablerepo = this.manager.getRepository(User);
    }

    /**
     * https://typeorm.io/#/find-options
     */
    public async sample1(): Promise<User[]> {
        // Repository
        return this.user.find();
    }

    public async sample2(): Promise<User[]> {
        // EntityManager
        return this.manager.find(User);
    }

    public async sample3(): Promise<User[]> {
        // EntityManagerRepository
        return this.tablerepo.find();
    }

    /**
     * https://typeorm.io/#/select-query-builder
     */
    public async joinQuery(): Promise<boolean> {
        await this.user
            .createQueryBuilder('tb1')
            .innerJoin('role', 'tb2', 'tb2.id = tb1.id') // inner or left
            .select(['tb1', 'tb2.title'])
            .where('tb1.id = :id', { id: 123 })
            .getRawOne(); // getOne, getMany, getRawMany ...

        await this.user.createQueryBuilder('tb1').innerJoinAndSelect('role', 'tb2', 'tb2.id = tb1.id').getOne();

        await this.user.createQueryBuilder('tb1').leftJoinAndSelect(Role, 'tb2', 'tb2.id = tb1.id').getRawMany();

        await this.user.createQueryBuilder('tb1').leftJoinAndMapOne('tb1.tb2row', 'role', 'tb2', 'tb2.id = tb1.id').getOne();

        await this.user.createQueryBuilder('tb1').leftJoinAndMapMany('tb1.tb2row', Role, 'tb2', 'tb2.id = tb1.id').getMany();

        return true;
    }
}
