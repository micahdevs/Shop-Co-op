import { MyContext } from '../types';
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(password)
        const user = em.create(User, {
            username: username,
            password: hashedPassword,
        });
        await em.persistAndFlush(user);
        return user;
    }
}