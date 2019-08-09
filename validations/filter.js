const filter = searchString => {
  let money = searchString.replace(/[^0-9]/g, "");
  let withoutNum = searchString.replace(/[0-9]/g, "");

  let remWords = [
    "female",
    "male",
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "doctor",
    "doctors",
    "i",
    "want",
    "results",
    "me",
    "a",
    "find",
    "within",
    "taka",
    "around"
  ];

  // let withoutNumGen = withoutNum
  //   .replace(/female/g, "")
  //   .replace(/male/g, "")
  //   .replace(/ +(?= )/g, "");

  var remWordsJoin = remWords.join("|");
  let withoutNumGenDay = withoutNum
    .replace(new RegExp("\\b(" + remWordsJoin + ")\\b", "gi"), " ")
    .replace(/\s{2,}/g, " ");

  let lowerThan = 5000;
  let gender = "";
  let day = "";

  if (money) {
    lowerThan = parseInt(money);
  }
  if (withoutNum.toLowerCase().includes("female")) {
    gender = "female";
  } else if (gender === "" && withoutNum.toLowerCase().includes("male")) {
    gender = "male";
  }

  if (withoutNum.toLowerCase().includes(remWords[2])) day = remWords[2];
  if (withoutNum.toLowerCase().includes(remWords[3])) day = remWords[3];
  if (withoutNum.toLowerCase().includes(remWords[4])) day = remWords[4];
  if (withoutNum.toLowerCase().includes(remWords[5])) day = remWords[5];
  if (withoutNum.toLowerCase().includes(remWords[6])) day = remWords[6];
  if (withoutNum.toLowerCase().includes(remWords[7])) day = remWords[7];
  if (withoutNum.toLowerCase().includes(remWords[8])) day = remWords[8];

  return {
    filteredString: withoutNumGenDay,
    money: lowerThan,
    gender: gender,
    day: day
  };
};

module.exports = filter;
