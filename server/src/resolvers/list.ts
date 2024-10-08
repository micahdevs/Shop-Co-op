import { List } from '../entities/List';
import { Query, Resolver, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { MyContext } from '../types';

@Resolver()
export class ListResolver { 
    @Query(() => [List])
    lists(@Ctx() { em }: MyContext): Promise<List[]> {
        return em.find(List, {});
    }    

    @Query(() => List, { nullable: true })
    list(
        @Arg('id', () => Int, { nullable: true }) _id: number,
        @Ctx() { em }: MyContext
    ): Promise<List | null> {
        return em.findOne(List, { _id });
    }

    @Mutation(() => List)
    async createList(
        @Arg('title', () => String) title: string,
        @Ctx() { em }: MyContext
    ): Promise<List> {
        const list = em.create(List, { title });
        await em.persistAndFlush(list);
        return list;
    }

    @Mutation(() => List, { nullable: true })
    async updateList(
        @Arg('id') _id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<List | null> {
        const list = await em.findOne(List, { _id });
        if (!list) {
            return null;
        }
        if (typeof title !== 'undefined') {
            list.title = title;
            await em.persistAndFlush(list);
        }
        return list;
    }

    @Mutation(() => Boolean)
    async deleteList(
        @Arg('id') _id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        await em.nativeDelete(List, { _id });
        return true;
    }
}