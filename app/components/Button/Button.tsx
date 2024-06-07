import { ButtonProps } from "./ButtonProps";
import cn from 'classnames'
import styles from './Button.module.css'

export const Button = ({children, isActive = false, ...props}: ButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.btn, {[styles.activeBtn]: isActive})} {...props}>
      {children}
    </button>
  )
}