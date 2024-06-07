import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SearchbarProps  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  coins: string[]
  onSearch?: (value: string) => void
}