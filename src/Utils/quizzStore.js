import { observable, action } from 'mobx';
import { values, random, filter } from 'lodash';

export default class QuizzStore {
  @observable quizzList = [];
  @observable selectedQuizz = {};
  @observable listIsEmpty = false;

  @action dispatchListIsEmpty() {
    this.listIsEmpty = true;
  }

  @action updateQuizzList(fetchedQuizzList) {
    const processedFetchedQuizzList = values(fetchedQuizzList)
    this.quizzList.length = 0;
    this.quizzList.push(...processedFetchedQuizzList);
  }

  @action updateSelectedQuizz(index) {
    if (index >= 0 && index < this.quizzList.length) {
      this.selectedQuizz = this.quizzList[index];
    }
  }

  selectRandomQuizz() {
    if (this.quizzList.length === 0) {
      this.dispatchListIsEmpty();
    }
    this.updateSelectedQuizz([random(0, this.quizzList.length - 1)]);
  }

  withdrawCurrentQuizz() {
    const quizzList = filter(this.quizzList, quizz => quizz.question !== this.selectedQuizz.question);
    this.updateQuizzList(quizzList);
  }

  getNextQuizz() {
    this.withdrawCurrentQuizz();
    this.selectRandomQuizz();
  }

  fetchQuizzList(quizzList) {
    this.updateQuizzList(quizzList);
    this.selectRandomQuizz();
  }
}
