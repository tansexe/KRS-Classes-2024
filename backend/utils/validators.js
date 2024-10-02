const checkEmail = (email) => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
};

//tnp@gmail.com
//True 
// !true = false 
// if wala block won't work 

// but invalid ho toh true return karega and if will work. 

const checkPass = (pass) => {
  const passPattern = /^(?=.*\d).{10,}$/;
  return passPattern.test(pass);
};
module.exports = {
  checkEmail,
  checkPass,
};
