import { useForm } from 'hooks/useForm';
import { searchFormState } from './searchFormState';

import PropTypes from 'prop-types';

import css from 'components/SearchForm/SearchForm.module.css';

function SearchForm({onSubmit}) {
  const { formState, onFormChange, onFormSubmit} = useForm({ searchFormState, onSubmit });

  const { query } = formState;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css[`SearchForm-button`]}>
          <span className={css[`SearchForm-button-label`]}>Search</span>
        </button>
        <input
          className={css[`SearchForm-input`]}
          type="text"
          name="query"
          value={query}
          onChange={onFormChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchForm.defaultProps = {
  onSubmit: () => { },
  isReset: false,
};
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchFormState: PropTypes.object,
};
export default SearchForm;
