import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  coin: string
  status: string
}