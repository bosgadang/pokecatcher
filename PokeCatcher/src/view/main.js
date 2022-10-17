import '../components/poke-catch';
import '../components/poke-card';
import '../components/poke-logs';
import '../components/poke-ball';
import DataPokemon from '../data/data-pokemon';

const main = () => {
  const catchElement = document.querySelector('poke-catch');
  const ballElement = document.querySelector('poke-ball');
  const cardElement = document.querySelector('poke-card');
  const logsElement = document.querySelector('poke-logs');

  const onButtonCatchClicked = async () => {
    try {
      const result = await DataPokemon.findPokemon(catchElement.value);
      renderResult(result);
    } catch (error) {
      fallbackResult(error);
    }
  };

  const renderResult = (results) => {
    cardElement.card = results;
    logsElement.pokemon = results;
    ballElement.pokemon = results;
  };

  const fallbackResult = (error) => {
    cardElement.renderError(error);
    logsElement.renderError(error);
  };

  catchElement.clickEvent = onButtonCatchClicked;
};

export default main;
