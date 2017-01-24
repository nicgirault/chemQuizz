import { observable, action } from 'mobx';
import { values, random, filter } from 'lodash';

export default class QuizzStore {
  @observable quizzList = [];
  @observable selectedQuizz = {};
  @observable listIsEmpty = false;
  @observable errorCount = 0;

  @action dispatchListIsEmpty() {
    this.listIsEmpty = true;
  }

  @action addError() {
    this.errorCount++;
  }

  @action resetErrorCount() {
    this.errorCount = 0;
  }

  @action updateQuizzList(fetchedQuizzList) {
    const processedFetchedQuizzList = values(fetchedQuizzList)
    this.quizzList.length = 0;
    this.quizzList.push(...processedFetchedQuizzList);
    this.listIsEmpty = !(this.quizzList.length > 0);
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
    this.resetErrorCount();
    this.selectRandomQuizz();
  }
}
