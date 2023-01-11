import { useState } from 'react';

export function useForm({ onSubmit, searchFormState, isReset }) {
  const [formState, setForm] = useState({ ...searchFormState });

  function onFormChange({ target }) {
    const { name, value } = target;
    setForm({
      [name]: value,
    });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    onSubmit({ ...formState });

    if (isReset) {
      resetForm();
    }
  }

  function resetForm() {
    setForm({ ...searchFormState });
  }

  return { formState, setForm, onFormChange, onFormSubmit, resetForm, isReset };
}

useForm.defaultProps = {
  isReset: true,
};
