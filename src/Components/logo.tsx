import React, { FC } from "react";
import { Avatar } from "antd";

type Props = {
  src: string;
};

const Logo: FC<Props> = ({ src }) => (
  <Avatar size="small" src={src} shape="square" />
);
export default Logo;
