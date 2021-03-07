function transDate(createDate) {
  const date = new Date(createDate);
  return `${
    date.getMonth() + 1
  }月${date.getDate()}日${date.getHours()}:${date.getUTCMinutes()}`;
}

export default transDate;
