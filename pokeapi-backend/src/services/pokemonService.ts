import { prisma } from '../../prisma/prismaClient';
export async function catchPokemon(id: number, name: string, height: number, weight: number, sprite_front_default: string, userId: number) {
    let pokemon = await prisma.pokemon.findUnique({ where: { id } });
    if (!pokemon) 
        pokemon = await prisma.pokemon.create({ data: { id, name, height, weight, sprite_front_default } });
    await prisma.userPokemon.create({ data: { userId, pokemonId: pokemon.id } });
    return pokemon;
}

export async function releasePokemon(id: number, userId: number) {
    const pokemon = await prisma.userPokemon.delete({ where: { userId_pokemonId: { userId, pokemonId: id } } });
    return pokemon;
}

export async function getPokemons(userId: number) {
    const pokemon = await prisma.userPokemon.findMany({ 
        where: { userId },
        include: {
            pokemon: true
        }
    });
    return pokemon;
}

export async function getPokemon(id: number, userId: number) {
    const find = await prisma.userPokemon.findUnique({ 
        where: { userId_pokemonId: { userId, pokemonId: id } },
        include: {
            pokemon: true
        }
    });
    if (!find) return null;
    return find.pokemon;
}