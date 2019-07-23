export class App { 
  test: boolean = false

  attached() {
    setTimeout(() => {
      this.test = !this.test
    }, 5000);

    setTimeout(() => {
      this.test = !this.test
    }, 10000);
  }
}