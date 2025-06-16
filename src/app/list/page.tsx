import React from "react";
import { getList } from "@/services/list";
import ListItem from "../../../components/list/ListItem";

const List = async () => {
  const listRAW = await getList();
  const list = listRAW[0].cart.map((c: any) => c?.name);
  return list.map((l: any, i: number) => <ListItem key={i} name={l} />);
};

export default List;
