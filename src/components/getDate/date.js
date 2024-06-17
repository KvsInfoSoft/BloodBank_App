export default class getDate {
  getDate(value) {
    
    if (value == 0) {
      const date = new Date();
      const yesturdayDate = date.getDate() - 1;
      date.setDate(yesturdayDate);
      return date.toLocaleDateString('en-CA');
    } else {
      const date = new Date();
      const yesturdayDate = date.getDate();
      date.setDate(yesturdayDate);
      return date.toLocaleDateString('en-CA');
    }
  }
}
