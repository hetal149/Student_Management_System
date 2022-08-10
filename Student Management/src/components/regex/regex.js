export const validName = new RegExp('^[a-zA-Z ]+$');
export const validClass= new RegExp('^[0-9]');
export const validMobile= new RegExp('^[0-9]');
export const validUsername = new RegExp('^[a-zA-Z0-9 ]+$');
export const validEmail = new RegExp('^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$');
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,12}$');