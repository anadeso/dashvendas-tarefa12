import './styles.css';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Store } from '../../types/store';
import { requestBackend } from '../../utils/requests';

export type FilterData = {
  store: Store | null;
};

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

const StoreFilter = ({ onSubmitFilter }: Props) => {
  const [selectStores, setSelectStores] = useState<Store[]>([]);

  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const onSubmit = (formData: FilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeStore = (value: Store) => {
    setValue('store', value);

    const obj: FilterData = {
      store: getValues('store')
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/stores' }).then((response) => {
      setSelectStores(response.data);
    });
  }, []);

  return (
    <div className="base-card store-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="store-filter-form">
        <div className="store-filter-bottom-container">
          <div className="store-filter-store-container">
            <Controller
              name="store"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  classNamePrefix="store-filter-select"
                  onChange={(value) => handleChangeStore(value as Store)}
                  options={selectStores}
                  isClearable
                  getOptionLabel={(store: Store) => store.name}
                  getOptionValue={(store: Store) => String(store.id)}
                  placeholder="Selecione a loja"
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreFilter;
