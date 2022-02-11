import * as yup from 'yup';

yup.setLocale({
  string: {
    email: 'Email inválido',
    min: '${path}: valor muito curto (mí­nimo ${min} caracteres)',
    max: '${path}: valor muito longo (máximo ${max} caracteres)',
    matches: '${path}: valor inválido, verifique o formato esperado',
    length: '${path}: deve conter exatamente ${length} caracteres',
  },
  mixed: {
    required: '${path} é obrigatório',
    oneOf: '${path} deve ser um dos seguintes valores [${values}]',
  },
});

export default yup;
