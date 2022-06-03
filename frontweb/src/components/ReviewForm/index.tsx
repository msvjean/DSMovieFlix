import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type FormData = {
  movieId: number;
  text: string;
};

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    const formReviewText = getValues('text');

    if(formReviewText === ""){
      toast.error("Não é permitido salvar avaliação vazia.");
      return;
    }

    formData.movieId = parseInt(movieId);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    console.log(formData);

    requestBackend(params)
      .then((response) => {
        toast.info("Avaliação salva com sucesso.");
        setValue('text', '');
        onInsertReview(response.data);
      })
      .catch((error) => {
        console.log('Erro ao salvar', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('text')}
            type="text"
            className={`form-control base-input review-input ${
              errors.text ? 'is-invalid' : ''
            }`}
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div className="invalid-feedback d-block div-error">
            {errors.text?.message}
          </div>
        </div>
        <div className="submit-review">
          <ButtonIcon text="SALVAR AVALIAÇÃO" />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
