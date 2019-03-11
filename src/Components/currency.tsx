import React, { FC } from "react";

type Props = {
  value: string | number;
};

function currencyFormat(num: string | number) {
  return "£" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const currency: FC<Props> = ({ value }) => <span>{currencyFormat(value)}</span>;

export default currency;
