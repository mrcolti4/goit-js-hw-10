export class infoMessage {
  constructor(message, query) {
    this.message = message;
    this.query = query;
    query.textContent = message;
  }
  hideMessage() {
    this.query.classList.add('hidden');
  }
  showMessage() {
    this.query.classList.remove('hidden');
  }
}
