export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  // pokemonService: {
  //   apiKey: process.env.POKEMON_KEY ?? '',
  // },
});
