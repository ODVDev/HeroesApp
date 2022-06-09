import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import { useMemo } from 'react';

export const SearchScreen = () => {

  const navigate= useNavigate();
  const location= useLocation();

  const {q = ''}= queryString.parse(location.search);

  const [formValues,handleInputChange] = useForm({
    searchText: q,

  });


  const { searchText } = formValues;

  const heroesFiltered= useMemo( () =>  getHeroesByName(q), [q]);

 


  const handleSearch = (e) => {
      e.preventDefault();
      console.log(searchText);
      navigate(`?q=${searchText}`);


  }


  return (
    <>


      <div className="row">

        <div className="col-5">
          <h4 className='mt-4'>Search</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input 
            type="text"
            className="form-control" 
            name='searchText'
            placeholder="Search a Marvel or DC character"
            autoComplete='off'
            value={searchText}
            onChange={handleInputChange}
            />
            <button
            className='btn btn-outline-primary mt-2'
            type='submit'>
              Search...

            </button>
             </form>
        </div>

        <div className="col-7">
          <h4 className='mt-4'>Results</h4>
          <hr />
          {
            (q === '')
             ? <div className="alert alert-info"> Search a hero </div>
             : ( heroesFiltered.length === 0) 
             && <div className="alert alert-danger"> No results found: {q} </div>
          }
          {
            heroesFiltered.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero}
              />
            ))
          }

          </div>
    
      </div>
    </>
  )
}
