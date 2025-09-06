/* Regras - Campo minado
Cada célula tem 2 valores e 3 estados
com mina / sem mina
aberto / fechado / marcado

uma célula sem mina e aberto, mostra o numero de células com mina adjascentes à ele, em um raio de 1 célula para todos os seus lados e diagonais.

uma célula fechado pode ser marcado, indicando que existe uma mina em baixo dele.

uma célula fechado pode ser aberto;
    caso exista uma mina em baixo dele, o jogo é dado como perdido
    caso contrário, ele mostrará o numero de bombas


*/
