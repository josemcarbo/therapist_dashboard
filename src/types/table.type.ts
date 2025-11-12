import type { JSX } from "react";

export type TableCol = {
  key: string;
  header: string;
  sortable?: boolean;
  transform?: (value: any) => string | JSX.Element;
};
