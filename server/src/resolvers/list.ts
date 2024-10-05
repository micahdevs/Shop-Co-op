import { List } from '../entities/List';
import { Query, Resolver, Ctx } from 'type-graphql';
import { MyContext } from '../types';

@Resolver()
export class ListResolver {
    @Query(() => [List])
    lists(@Ctx() { em }: MyContext): Promise<List[]> {
        return em.find(List, {});
    }
}