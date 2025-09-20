import { Router } from "express";
import passport from "passport";
import { catchPokemon, getPokemon, getPokemons, releasePokemon } from "../services/pokemonService";

const pokemonRouter = Router();

pokemonRouter.put("/pokemon/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, height, weight, sprite_front_default } = req.body;
        const pokemon = await catchPokemon(Number(id), name, height, weight, sprite_front_default, req.user!.id);
        return res.json(pokemon);
    } catch (error) {
        console.log(error);
        return res.json({ caught: false });
    }

});

pokemonRouter.delete("/pokemon/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await releasePokemon(Number(id), req.user!.id);
        return res.json({ released: true, pokemonId: pokemon.id });
    } catch (error) {
        console.log(error);
        return res.json({ released: false });
    }

});

pokemonRouter.get("/pokemon/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await getPokemon(Number(id), req.user!.id);
        return res.json(pokemon);
    } catch (error) {
        console.log(error);
        return res.json(null);
    }
});

pokemonRouter.get("/pokemon", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const pokemon = await getPokemons(req.user!.id);
        return res.json(pokemon);
    } catch (error) {
        console.log(error);
        return res.json(null);
    }
});

export default pokemonRouter;