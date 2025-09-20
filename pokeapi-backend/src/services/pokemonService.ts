import { prisma } from '../../prisma/prismaClient';
export async function catchPokemon(id: number, name: string, height: number, weight: number, sprite_front_default: string, userId: number) {
    const pokemon = await prisma.pokemon.create({ data: { id, name, height, weight, sprite_front_default, userId } });
    return pokemon;
}

export async function releasePokemon(id: number, userId: number) {
    const pokemon = await prisma.pokemon.delete({ where: { id, userId } });
    return pokemon;
}