import { ExclusiveTranslationForm, TranslationForm } from '~/types'

export const getInitialFormValues = ({ item, from }: TranslationForm) => {
  const rules = {
    from: (value: string) => (value.length < 2 ? 'Must have at least 2 letters' : null),
    to: (value: string) => (value.length < 2 ? 'Must have at least 2 letters' : null),
  }

  if (item) {
    return {
      rules,
      values: {
        from: item?.from ?? '',
        to: item?.to ?? '',
        notes: item?.notes ?? '',
      },
    }
  }

  if (from) {
    return {
      rules,
      values: {
        from,
        to: '',
        notes: '',
      },
    }
  }

  return {
    rules,
    values: {
      from: '',
      to: '',
      notes: '',
    },
  }
}
