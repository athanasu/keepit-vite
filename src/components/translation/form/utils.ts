import { TranslationForm } from '~/types'

export const getInitialFormValues = ({ item, from }: TranslationForm) => {
  const rules = {
    from: (value: string) => (value.length < 2 ? 'Must have at least 2 letters' : null),
    to: (value: string) => (value.length < 2 ? 'Must have at least 2 letters' : null),
  }

  if (!!from && !!item) {
    return {
      rules,
      values: {
        from: '',
        to: '',
        notes: '',
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
      from: item?.from ?? '',
      to: item?.to ?? '',
      notes: item?.notes ?? '',
    },
  }
}
