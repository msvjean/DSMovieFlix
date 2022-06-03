import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';

import './styles.css';

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const { handleSubmit, control, setValue, getValues } =
    useForm<MovieFilterData>();

  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj: MovieFilterData = {
      genre: getValues('genre'),
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then((response) => {
      setSelectGenres(response.data);
    });
  }, []);

  return (
    <div className=" base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        <div className="movie-filter-category-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                isClearable
                classNamePrefix="movie-filter-select"
                placeholder="Genero"
                getOptionLabel={(genre) => genre.name}
                getOptionValue={(genre) => String(genre.id)}
                onChange={(value) => handleChangeGenre(value as Genre)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
