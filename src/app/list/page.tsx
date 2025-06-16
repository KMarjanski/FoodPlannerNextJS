import React from "react";
import { getList } from "@features/list/service";
import ListItem from "@features/list/component";

const List = async () => {
  const listRAW = await getList();
  const list = listRAW[0].cart.map((c: any) => c?.name);
  return list.map((l: any, i: number) => <ListItem key={i} name={l} />);
};

export default List;
