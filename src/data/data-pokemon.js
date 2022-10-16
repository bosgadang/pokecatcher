import axios from 'axios';
import lodash from 'lodash';
class DataPokemon {
  static findPokemon(number) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default DataPokemon;
