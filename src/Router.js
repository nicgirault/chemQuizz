import {
  createRouter,
} from '@exponent/ex-navigation';

import * as Pages from 'chemQuizz/src/pages';

export default createRouter(() => ({
  home: () => Pages.Home,
  login: () => Pages.LogIn,
  categories: () => Pages.Categories,
  signup: () => Pages.SignUp,
  quizz: () => Pages.Quizz,
}));
